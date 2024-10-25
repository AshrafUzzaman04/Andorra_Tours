<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlog;
use App\Http\Requests\UpdateBlog;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::with([])->paginate(10);
        return response()->json(["message" => "success", "data" => $blogs], 200);
    }


    public function Blogs()
    {
        $blogs = Blog::where("status", "active")
            ->select('title', 'slug', 'tag', 'photo', 'user_photo', 'user_name', 'button_text', 'date', 'created_at')
            ->with([])
            ->paginate(10);
        return response()->json(["message" => "success", "data" => $blogs], 200);
    }

    public function SlugByBlog($slug)
    {
        $blog = Blog::where("status", "active")
        ->where("slug", $slug)
        ->select('tag', 'title', 'slug', 'photo', 'user_photo', 'user_name', 'button_text', 'description', 'images', 'date', 'created_at')
        ->first();
        $blogs = Blog::where('status', 'active')->where("id","!=" ,$blog->id)->get(['title', 'slug', 'photo','date']);
        return response()->json(["message" => "success", "data" => $blog, "trending"=> $blogs], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlog $request)
    {
        $data = $request->validated();
        if ($request->hasFile("photo")) {
            $photoUrl = "storage/" . $request->photo->store("blog-image");
            $data["photo"] = $photoUrl;
        }
        if ($request->hasFile("user_photo")) {
            $photoUrl = "storage/" . $request->user_photo->store("blog-image");
            $data["user_photo"] = $photoUrl;
        }
        //blogs images will be come as array we need store this in storage
        if ($request->hasFile("images")) {
            $imageUrls = [];
            foreach ($request->file("images") as $image) {
                $imageUrls[] = "storage/" . $image->store("blog-image");
            }
            $data["images"] = json_encode($imageUrls);
        }
        Blog::create($data);
        return response()->json(["message" => "Blog created successfully", "data" => $data], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //if the blog is not found return 404
        if (!$blog) return response()->json(["message" => "Blog not found",], 422);
        return response()->json(["message" => "success", "data" => $blog], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlog $request, Blog $blog)
    {
        $data = $request->validated();

        $newPhotos = [];
        $existingPhotos = json_decode($blog->images, true) ?? [];

        if ($request->hasFile('images')) {
            $files = $request->images;
            if (is_array($files)) {
                foreach ($files as $file) {
                    $path = "storage/" . $file->store("blog-image");
                    $newPhotos[] = $path;
                }
            } else {
                $path = "storage/" . $request->images->store("blog-image");
                $newPhotos[] = $path;
            }
        }

        if ($request->has('remove_photos')) {
            $removePhotos = explode(",", $request->input('remove_photos')) ?? [];
            foreach ($removePhotos as $photoPath) {
                $explode = explode('/', $photoPath);
                $deletePath = $explode[1] . "/" . $explode[2];
                if (Storage::exists($deletePath)) {
                    Storage::delete($deletePath);
                }
                $existingPhotos = array_filter($existingPhotos, function ($value) use ($photoPath) {
                    return $value !== $photoPath;
                });
            }
        }

        $data['images'] = array_merge($existingPhotos, $newPhotos);

        if ($request->hasFile("photo")) {
            $explode = explode('/', $blog->photo);
            $deletePath = $explode[1] . "/" . $explode[2];
            if (Storage::exists($deletePath)) {
                Storage::delete($deletePath);
            }
            $photoUrl = "storage/" . $request->photo->store("blog-image");
            $data["photo"] = $photoUrl;
        }
        if ($request->hasFile("user_photo")) {
            if(!empty($blog->user_photo)){
                $explode = explode('/', $blog->user_photo);
                $deletePath = $explode[1] . "/" . $explode[2];
                if (Storage::exists($deletePath)) {
                    Storage::delete($deletePath);
                }
            }
            $photoUrl = "storage/" . $request->user_photo->store("blog-image");
            $data["user_photo"] = $photoUrl;
        }
        $blog->update($data);
        return response()->json(["message" => "Blog updated successfully", "data" => $data], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if (!$blog) return response()->json(["message" => "Blog not found",], 422);

        if (!empty($blog->photo)) {
            $expolde = explode("/", $blog->photo);
            $deletePath = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($deletePath)) {
                Storage::delete($deletePath);
            }
        }
        if (!empty($blog->images)) {
            $expolde = json_decode($blog->images, true);
            foreach ($expolde as $image) {
                $expolde = explode("/", $image);
                $deletePath = $expolde[1] . "/" . $expolde[2];
                if (Storage::exists($deletePath)) {
                    Storage::delete($deletePath);
                }
            }
        }

        if (!empty($blog->user_photo)) {
            $explode = explode('/', $blog->user_photo);
            $deletePath = $explode[1] . "/" . $explode[2];
            if (Storage::exists($deletePath)) {
                Storage::delete($deletePath);
            }
        }
        $blog->delete();
        return response()->json(["message" => "Blog deleted successfully",], 200);
    }
}
