<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = Chat::with('user')->where('user_id', "!=", Auth::user()->id)->get();
        return response()->json(["message"=> "success", "contacts"=>$results]);
    }
    
    public function searchParticipation ($query)
    {

        $authUserId = Auth::user()->id;
        
        $results = Chat::with('user')->whereHas('user', function ($q) use ($query, $authUserId) {
            $q->where('name', 'like', '%' . $query . '%')
              ->orWhere('email', 'like', '%' . $query . '%');
        })->where('user_id', '!=', Auth::user()->id)->get();
        return response()->json(["message"=> "success", "results"=>$results]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        //
    }
}
