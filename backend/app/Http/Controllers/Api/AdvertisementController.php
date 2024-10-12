<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdvertisementStore;
use App\Http\Requests\AdvertisementUpdate;
use App\Models\Advertisement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vadvertisements = Advertisement::with([])->paginate(10);
        return response()->json(["message" => "success", "data"=> $vadvertisements],200);
    }


    public function getAdvertisement()
    {
        $vadvertisements = Advertisement::where("status", "Active")->get();
        return response()->json(["message" => "success", "data"=> $vadvertisements],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdvertisementStore $request)
    {
        $data = $request->validated();
        if ($request->hasFile("image_one")) {
            $image = "storage/".$request->image_one->store("advertisement");
            $data['image_one'] = $image;
        }
        if ($request->hasFile("image_two")) {
            $image = "storage/".$request->image_two->store("advertisement");
            $data['image_two'] = $image;
        }
        if ($request->hasFile("image_three")) {
            $image = "storage/".$request->image_three->store("advertisement");
            $data['image_three'] = $image;
        }
        if ($request->hasFile("image_four")) {
            $image = "storage/".$request->image_four->store("advertisement");
            $data['image_four'] = $image;
        }
        if ($request->hasFile("image_five")) {
            $image = "storage/".$request->image_five->store("advertisement");
            $data['image_five'] = $image;
        }
        if ($request->hasFile("company_logo")) {
            $image = "storage/".$request->company_logo->store("advertisement");
            $data['company_logo'] = $image;
        }
        Advertisement::create($data);
        return response()->json(["success" => true, "message"=> "Advertisement created"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Advertisement $advertisement): JsonResponse
    {
        return response()->json(["message" => "success", "data"=> $advertisement],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AdvertisementUpdate $request, Advertisement $advertisement)
    {
        $data = $request->validated();
        if ($request->hasFile("image_one")) {
            if(!empty($advertisement->image_one)){
                $expolde = explode("/",$advertisement->image_one);
                $expoldePath = $expolde[1]."/".$expolde[2];
                if(Storage::exists($expoldePath)){
                    Storage::delete($expoldePath);
                }
            } 
            $image = "storage/".$request->image_one->store("advertisement");
            $data['image_one'] = $image;
        }
        if ($request->hasFile("image_two")) {
            if(!empty($advertisement->image_two)){
                $expolde = explode("/",$advertisement->image_two);
                $expoldePath = $expolde[1]."/".$expolde[2];
                if(Storage::exists($expoldePath)){
                    Storage::delete($expoldePath);
                }
            } 
            $image = "storage/".$request->image_two->store("advertisement");
            $data['image_two'] = $image;
        }
        if ($request->hasFile("image_three")) {
            if(!empty($advertisement->image_three)){
                $expolde = explode("/",$advertisement->image_three);
                $expoldePath = $expolde[1]."/".$expolde[2];
                if(Storage::exists($expoldePath)){
                    Storage::delete($expoldePath);
                }
            } 
            $image = "storage/".$request->image_three->store("advertisement");
            $data['image_three'] = $image;
        }
        if ($request->hasFile("image_four")) {
            if(!empty($advertisement->image_four)){
                $expolde = explode("/",$advertisement->image_four);
                $expoldePath = $expolde[1]."/".$expolde[2];
                if(Storage::exists($expoldePath)){
                    Storage::delete($expoldePath);
                }
            } 
            $image = "storage/".$request->image_four->store("advertisement");
            $data['image_four'] = $image;
        }
        if ($request->hasFile("image_five")) {
            if(!empty($advertisement->image_five)){
                $expolde = explode("/",$advertisement->image_five);
                $expoldePath = $expolde[1]."/".$expolde[2];
                if(Storage::exists($expoldePath)){
                    Storage::delete($expoldePath);
                }
            } 
            $image = "storage/".$request->image_five->store("advertisement");
            $data['image_five'] = $image;
        }
        if ($request->hasFile("company_logo")) {
            if(!empty($advertisement->company_logo)){
                $expolde = explode("/",$advertisement->company_logo);
                $expoldePath = $expolde[1]."/".$expolde[2];
                if(Storage::exists($expoldePath)){
                    Storage::delete($expoldePath);
                }
            } 
            $image = "storage/".$request->company_logo->store("advertisement");
            $data['company_logo'] = $image;
        }
        
        $advertisement->update($data);
        return response()->json(["success" => true, "message"=> "Advertisement Updated"],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Advertisement $advertisement)
    {
        if(!empty($advertisement->image_one)){
            $expolde = explode("/",$advertisement->image_one);
            $expoldePath = $expolde[1]."/".$expolde[2];
            if(Storage::exists($expoldePath)){
                Storage::delete($expoldePath);
            }
        } 
        if(!empty($advertisement->image_two)){
            $expolde = explode("/",$advertisement->image_two);
            $expoldePath = $expolde[1]."/".$expolde[2];
            if(Storage::exists($expoldePath)){
                Storage::delete($expoldePath);
            }
        } 
        if(!empty($advertisement->image_three)){
            $expolde = explode("/",$advertisement->image_three);
            $expoldePath = $expolde[1]."/".$expolde[2];
            if(Storage::exists($expoldePath)){
                Storage::delete($expoldePath);
            }
        } 
        if(!empty($advertisement->image_four)){
            $expolde = explode("/",$advertisement->image_four);
            $expoldePath = $expolde[1]."/".$expolde[2];
            if(Storage::exists($expoldePath)){
                Storage::delete($expoldePath);
            }
        } 
        if(!empty($advertisement->image_five)){
            $expolde = explode("/",$advertisement->image_five);
            $expoldePath = $expolde[1]."/".$expolde[2];
            if(Storage::exists($expoldePath)){
                Storage::delete($expoldePath);
            }
        }

        if(!empty($advertisement->company_logo)){
            $expolde = explode("/",$advertisement->company_logo);
            $expoldePath = $expolde[1]."/".$expolde[2];
            if(Storage::exists($expoldePath)){
                Storage::delete($expoldePath);
            }
        }
        $advertisement->delete();
        return response()->json(["success" => true, "message"=> "Advertisement deleted"],200);
    }
}
