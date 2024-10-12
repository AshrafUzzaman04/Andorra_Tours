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
        return Response::json(['message' => 'success', "files" => json_decode($content, true)]);
    }


    public function LanguageFile($id, Request $request)
    {
        $languages = ModelsLanguage::findOrFail($id);
        $filePath = base_path("lang/{$languages->language_code}/translations.json");

        // Check if the file exists
        if (!File::exists($filePath)) {
            return response()->json(['message' => 'Language file not found.'], 404);
        }

        // Read the file content
        $content = File::get($filePath);
        $data = json_decode($content, true);

        // Transform data into the desired format
        $formattedData = [];
        foreach ($data as $key => $translation) {
            $formattedData[] = [
                'code' => $languages->language_code,
                'state' => true, // You can change this logic based on your requirements
                'key' => $key,
                'source' => $translation, // Assuming the translation is the source text
                'translation' => $translation, // Assuming the translation is the same as source
            ];
        }

        // Get pagination parameters from the request
        $perPage = $request->input('per_page', 10); // Default items per page
        $currentPage = $request->input('page', 1); // Default to page 1

        // Paginate the data
        $totalItems = count($formattedData);
        $offset = ($currentPage - 1) * $perPage;
        $paginatedItems = array_slice($formattedData, $offset, $perPage);

        // Create response with pagination metadata
        return response()->json([
            'message' => 'success',
            'data' => $paginatedItems,
            'pagination' => [
                'total' => $totalItems,
                'per_page' => $perPage,
                'current_page' => $currentPage,
                'last_page' => ceil($totalItems / $perPage),
            ],
        ]);
    }


    public function getTranslationByKey($languageCode, $key)
    {
        $filePath = base_path("lang/{$languageCode}/translations.json");

        if (!File::exists($filePath)) {
            return response()->json(['message' => 'Language file not found.'], 404);
        }

        $content = json_decode(File::get($filePath), true);

        // Check if the key exists in the content
        if (array_key_exists($key, $content)) {
            return response()->json([
                "data"=>[
                    'key' => $key, 
                    'value' => $content[$key]
                ]
            ]);
        } else {
            return response()->json(['message' => 'Translation key not found.'], 404);
        }
    }


    public function updateTranslation(Request $request, $languageCode)
    {
        $filePath = base_path("lang/{$languageCode}/translations.json");
        if (!File::exists($filePath)) {
            return response()->json(['message' => 'Language file not found.'], 404);
        }

        $content = json_decode(File::get($filePath), true);
        $key = $request->input('key');
        $value = $request->input('value');

        $content[$key] = $value;
        File::put($filePath, json_encode($content, JSON_PRETTY_PRINT));

        return response()->json(['message' => 'Translation updated successfully.']);
    }


    public function deleteTranslation($languageCode, $key)
    {
        $filePath = base_path("lang/{$languageCode}/translations.json");
        if (!File::exists($filePath)) {
            return response()->json(['message' => 'Language file not found.'], 404);
        }

        $content = json_decode(File::get($filePath), true);
        if (isset($content[$key])) {
            unset($content[$key]);
            File::put($filePath, json_encode($content, JSON_PRETTY_PRINT));
        }

        return response()->json(['message' => 'Translation deleted successfully.']);
    }


    public function getLanguage()
    {
        // Define the path to the English (source) language JSON file
        $sourceLanguageCode = 'en'; // Assuming English is the source language
        $sourceFilePath = base_path("lang/{$sourceLanguageCode}/translations.json");

        // Check if the source file exists and count the keys
        $sourceKeys = [];
        if (File::exists($sourceFilePath)) {
            $sourceKeys = json_decode(File::get($sourceFilePath), true);
        }
        $totalSourceKeys = count($sourceKeys);

        // Fetch all languages from the database
        $languages = ModelsLanguage::all();

        // Map the languages to the desired structure
        $languageData = $languages->map(function ($language) use ($totalSourceKeys, $sourceKeys) {
            // Set the flag based on the language code (adjust as needed for each language)
            $flags = [
                'bn' => 'bd', // Bengali
                'zh' => 'cn', // Chinese
                'nl' => 'nl', // Dutch
                'en' => 'gb', // English
                'fr' => 'fr', // French
                'de' => 'de', // German
                'el' => 'gr', // Greek
                'hi' => 'in', // Hindi
                'it' => 'it', // Italian
                'ja' => 'jp', // Japanese
                'ko' => 'kr', // Korean
                'pt' => 'pt', // Portuguese
                'ru' => 'ru', // Russian
                'es' => 'es', // Spanish
                'sv' => 'se', // Swedish
                'tr' => 'tr', // Turkish
                'ur' => 'pk', // Urdu
                'vi' => 'vn', // Vietnamese
                'ad' => 'ad', // Andorra
                'ar' => 'ar', // Argentina
                'sq' => 'al', // Albanian
                'bs' => 'ba', // Bosnian
                'hr' => 'hr', // Croatian
                'da' => 'dk', // Danish
                'et' => 'ee', // Estonian
                'fi' => 'fi', // Finnish
                'hu' => 'hu', // Hungarian
                'is' => 'is', // Icelandic
                'ga' => 'ie', // Irish
                'lv' => 'lv', // Latvian
                'lt' => 'lt', // Lithuanian
                'mt' => 'mt', // Maltese
                'no' => 'no', // Norwegian
                'pl' => 'pl', // Polish
                'ro' => 'ro', // Romanian
                'sr' => 'rs', // Serbian
                'sk' => 'sk', // Slovak
                'sl' => 'si', // Slovenian
                'uk' => 'ua', // Ukrainian
                'bg' => 'bg', // Bulgarian
                'cs' => 'cz', // Czech
                'pt-BR' => 'br', // Portuguese (Brazil)
                'ca' => 'es', // Catalan
                'eu' => 'es', // Basque
                'gl' => 'es', // Galician
                'lb' => 'lu', // Luxembourgish
                'be' => 'by', // Belarusian
                'cnr' => 'me', // Montenegrin
            ];

            $flag = $flags[$language->language_code] ?? 'default'; // Use 'default' if not found

            // Get the path to the language file
            $filePath = base_path("lang/{$language->language_code}/translations.json");

            // Count the number of keys present in the current language file that match with the source keys
            $keysCount = 0;
            if (File::exists($filePath)) {
                $languageKeys = json_decode(File::get($filePath), true);
                // Count the keys that exist in both the source and the current language file
                $keysCount = count(array_intersect_key($languageKeys, $sourceKeys));
            }

            // Calculate progress based on the number of matched keys
            $progress = $totalSourceKeys > 0 ? round(($keysCount / $totalSourceKeys) * 100) : 0;

            // Return the language data in the required format
            return [
                'id' => $language->id,
                'name' => $language->name,
                'code' => $language->language_code,
                'flag' => $flag,
                'progress' => $progress,
                'sourceKeys' => $keysCount,
            ];
        });

        return response()->json(['message' => 'success', 'data' => $languageData], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $languages = json_decode($request->input('language'), true);; // Assuming this is an array
        $createdLanguages = []; // To keep track of created languages

        foreach ($languages as $data) {
            $validation = Validator::make($data, [
                'name' => "required|string|max:255|min:2|unique:languages,name",
                'language_code' => 'required|string|max:2',
                'status' => 'nullable|string|in:Active,Inactive',
            ]);

            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }

            // Create the language record
            $language = ModelsLanguage::create($data);
            $createdLanguages[] = $language; // Store created language for response

            $languageCode = $data['language_code'];
            $directoryPath = base_path("lang/{$languageCode}");
            $filePath = "{$directoryPath}/translations.json";

            if (!File::exists($directoryPath)) {
                File::makeDirectory($directoryPath, 0755, true);
            }
            if (File::exists($filePath)) {
                return response()->json(['message' => 'Language file already exists.'], 400);
            }

            // Path to the English (source) JSON file
            $sourceFilePath = base_path("lang/en/translations.json");

            // Read the content of the English file if it exists, otherwise use an empty object
            $initialContent = File::exists($sourceFilePath)
                ? json_decode(File::get($sourceFilePath), true)
                : (object)[];

            // Convert the content back to a JSON string with pretty print
            $newLanguageContent = json_encode($initialContent, JSON_PRETTY_PRINT);

            // Create the new language file and add the content from the English file
            File::put($filePath, $newLanguageContent);
        }

        return response()->json(['message' => "Languages created successfully", 'data' => $createdLanguages], 201);
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
        if (!$language) return response()->json(["message" => "Language not found"], 422);

        $validation = Validator::make($request->all(), [
            'name' => "required|string|max:255|min:2|unique:languages,name," . $id,
            'language_code' => "required|string|max:2|unique:languages,language_code," . $id,
            'status' => 'nullable|string|in:Active,Inactive',
        ]);
        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }

        // Store the old language code before updating
        $oldLanguageCode = $language->language_code;

        // Update the language record with new data
        $data = $request->only(['name', 'status', 'language_code']);
        $language->update($data);

        // Get the new language code and convert both to lowercase for case-insensitive comparison
        $newLanguageCode = $request->input('language_code');
        $oldDirectoryPath = base_path("lang/{$oldLanguageCode}");
        $newDirectoryPath = base_path("lang/{$newLanguageCode}");
        $oldFilePath = "{$oldDirectoryPath}/translations.json";
        $newFilePath = "{$newDirectoryPath}/translations.json";

        // If the language code has changed, even if it's just a case change
        if (strtolower($oldLanguageCode) !== strtolower($newLanguageCode) || $oldLanguageCode !== $newLanguageCode) {
            // Check if the new directory exists; if not, create it
            if (!File::exists($newDirectoryPath)) {
                File::makeDirectory($newDirectoryPath, 0755, true);
            }

            // If the file for the new language code already exists and it's not just a case change, return an error
            if (File::exists($newFilePath) && strtolower($oldLanguageCode) !== strtolower($newLanguageCode)) {
                return response()->json(['message' => 'Language file for the new code already exists.'], 400);
            }

            // If the old file exists, move it to the new location
            if (File::exists($oldFilePath)) {
                File::move($oldFilePath, $newFilePath);
            } else {
                // If the old file does not exist, copy the content from the English file
                $sourceFilePath = base_path("lang/en/translations.json");
                $initialContent = File::exists($sourceFilePath)
                    ? json_decode(File::get($sourceFilePath), true)
                    : (object)[];

                // Convert the content back to a JSON string with pretty print
                $newLanguageContent = json_encode($initialContent, JSON_PRETTY_PRINT);

                // Create the new language file and add the content from the English file
                File::put($newFilePath, $newLanguageContent);
            }

            // Optionally, delete the old directory if it is empty
            if (File::isDirectory($oldDirectoryPath) && count(File::files($oldDirectoryPath)) === 0) {
                File::deleteDirectory($oldDirectoryPath);
            }
        }

        return response()->json(['message' => "Language updated successfully", $initialContent], 200);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $language = ModelsLanguage::find($id);
        if (!$language) return response()->json(["message" => "Language not found",], 422);

        // Get the language code before deleting the record
        $languageCode = $language->language_code;

        // Path to the language directory and file
        $directoryPath = base_path("lang/{$languageCode}");
        $filePath = "{$directoryPath}/translations.json";

        // Delete the language record
        $language->delete();

        // Check if the file exists and delete it
        if (File::exists($filePath)) {
            File::delete($filePath);
        }

        // Optionally, delete the directory if it is empty after deleting the file
        if (File::isDirectory($directoryPath) && count(File::files($directoryPath)) === 0) {
            File::deleteDirectory($directoryPath);
        }

        return response()->json(['message' => "Language deleted successfully and file removed"], 200);
    }
}
