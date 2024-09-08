<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSent;
use App\Events\NotificationEvent;
use App\Events\RetriveMessages;
use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ChatMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($senderId) {}

    public function UnreadMessages()
    {
        $notificationData = ChatMessage::with(['sender'])->where('receiver_id', Auth::user()->id)->where('is_read', false)->get();
        $unreadMessges = ChatMessage::with(['sender'])->where('receiver_id', Auth::user()->id)->where('is_read', false)->count();
        return response()->json(['success' => true, 'data' => [
            'unread_message' => $unreadMessges,
            'notificationData' => $notificationData
        ]]);
    }

    public function SeenMessages($senderId)
    {
        ChatMessage::where('receiver_id', Auth::user()->id)
            ->where('sender_id', $senderId)
            ->update(['is_read' => true]);
        $notificationData = ChatMessage::where('receiver_id', Auth::user()->id)->where('sender_id', $senderId)->get();
        $unreadMessges = ChatMessage::with(['sender'])->where('receiver_id', Auth::user()->id)->where('is_read', false)->count();
        return response()->json(['success' => true, 'data' => [
            'unread_message' => $unreadMessges,
            'notificationData' => $notificationData
        ]]);
    }

    public function MessageReceiver($receiverId)
    {
        $receiver = User::find($receiverId);
        return response()->json(['message' => 'success', 'data' => $receiver]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $from = Auth::user()->id;
        $data = $request->only(['receiver_id', "messages"]);
        $data['sender_id'] = $from;
        ChatMessage::create($data);
        $receiver = User::find($request->receiver_id);
        $sender = User::find($from);
        broadcast(new MessageSent($receiver, $sender, $request->messages));
        // $notificationData = ChatMessage::with()->where('receiver_id', Auth::user()->id)->where('is_read',false)->get();
        broadcast(new RetriveMessages($receiver,$sender));
        return response()->json(['success' => true, 'message' => 'Success', $receiver, $sender]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ChatMessage $chatMessage, $senderId)
    {
        // Retrieve messages between the authenticated user and the specified friend
        $messages = ChatMessage::where(function ($query) use ($senderId) {
            $query->where('sender_id', Auth::user()->id)
                ->where('receiver_id', $senderId);
        })
            ->orWhere(function ($query) use ($senderId) {
                $query->where('sender_id', $senderId)
                    ->where('receiver_id', Auth::user()->id);
            })
            ->with(['sender'])->get();

        return response()->json(['message' => 'success', 'data' => $messages]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChatMessage $chatMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChatMessage $chatMessage)
    {
        //
    }
}
