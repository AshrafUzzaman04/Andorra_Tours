<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Language as ModelsLanguage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
class Language extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $languages = ModelsLanguage::with([])->paginate(10);
        return response()->json(['message' => "success", "data" => $languages]);
    }

    public function getLanguageFile($languageCode)
    {
        $filePath = base_path("lang/{$languageCode}/translations.json");

        // Check if the file exists
        if (!File::exists($filePath)) {
            return response()->json(['message' => 'Language file not found.'], 404);
        }

        // Read the file content
        $content = File::get($filePath);

        // Return the file content as JSON
        return Response::json(['message'=>'success', "files" => json_decode($content, true)]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => "required|string|max:255|min:2|unique:languages,name",
            'language_code' => 'required|string|max:2',
            'status' => 'nullable|string|in:Active,Inactive',
        ]);
        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }
        $data = $request->only(['name', 'status', 'language_code']);
        ModelsLanguage::create($data);

        $languageCode = $request->input('language_code');
        $directoryPath = base_path("lang/{$languageCode}");
        $filePath = "{$directoryPath}/translations.json";

        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }
        if (File::exists($filePath)) {
            return response()->json(['message' => 'Language file already exists.'], 400);
        }
        $initialContent = json_encode([
        ], JSON_PRETTY_PRINT);
        File::put($filePath, $initialContent);

        return response()->json(['message' => "Language create successfully",], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $language = ModelsLanguage::find($id);
        if (!$language) return response()->json(["message" => "Language not found",], 422);
        return response()->json(['message' => "success", "data" => $language], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $language = ModelsLanguage::find($id);
        if (!$language) return response()->json(["message" => "Language not found",], 422);

        $validation = Validator::make($request->all(), [
            'name' => "required|string|max:255|min:2|unique:languages,name," . $id,
            'language_code' => "required|string|max:2|unique:languages,language_code," . $id,
            'status' => 'nullable|string|in:Active,Inactive',
        ]);
        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }
        $data = $request->only(['name', 'status', 'language_code']);
        $language->update($data);

        $languageCode = $request->input('language_code');
        $directoryPath = base_path("lang/{$languageCode}");
        $filePath = "{$directoryPath}/translations.json";

        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }
        if (File::exists($filePath)) {
            return response()->json(['message' => 'Language file already exists.'], 400);
        }
        $initialContent = json_encode([
        ], JSON_PRETTY_PRINT);
        File::put($filePath, $initialContent);

        return response()->json(['message' => "Language update successfully",], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $language = ModelsLanguage::find($id);
        if (!$language) return response()->json(["message" => "Language not found",], 422);
        $language->delete();
        return response()->json(['message' => "Language delete successfully"], 200);
    }
}
