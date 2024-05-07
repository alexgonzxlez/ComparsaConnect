<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Friendship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendshipController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        $userId = Auth::id();
    
        $users = User::where('id', '!=', $userId)
                     ->where(function ($queryBuilder) use ($query) {
                         $queryBuilder->where('name', 'like', "%{$query}%")
                                      ->orWhere('username', 'like', "%{$query}%");
                     })
                     ->select('id', 'name', 'username', 'created_at')
                     ->get();
    
        // estado de amistad
        $usersmod = $users->map(function ($user) use ($userId) {
            $friendship = Friendship::where(function ($query) use ($user, $userId) {
                $query->where('user_id', $userId)
                      ->where('friend_id', $user->id);
            })->orWhere(function ($query) use ($user, $userId) {
                $query->where('user_id', $user->id)
                      ->where('friend_id', $userId);
            })->first();
            
            if ($friendship) {
                if ($friendship->status === 'accepted') {
                    $friendStatus = 'accepted';
                } else {
                    // Verificar si el usuario actual envió la solicitud
                    $friendStatus = ($friendship->user_id === $userId) ? 'sended' : 'pending';
                }
            } else {
                $friendStatus = 'none';
            }
    
            $user->friend_status = $friendStatus;
    
            return $user;
        });
    
        return response()->json([
            'success' => true,
            'data'    => $usersmod,
        ], 200);
    }
        

    public function sendFriendRequest(User $recipient)
    {
        if ($recipient->id === auth()->id()) {
            return response()->json(['error' => 'No puedes enviarte una solicitud de amistad a ti mismo.'], 400);
        }
    
        $existingRequest = $recipient->friendships()->where('friend_id', auth()->id())->first();
        if ($existingRequest) {
            return response()->json(['error' => 'Ya tienes una solicitud de amistad pendiente de este usuario.'], 400);
        }
    
        // Crear la solicitud de amistad
        auth()->user()->friendships()->create([
            'friend_id' => $recipient->id,
            'status' => 'pending',
        ]);
    
        return response()->json(['success' => true, 'message' => 'Solicitud de amistad enviada.'], 201);
    }
    
    public function acceptFriendRequest(User $friend)
    {
        $friendship = Friendship::where('user_id', $friend->id)
                                ->where('friend_id', auth()->id())
                                ->first();
    
        if (!$friendship) {
            return response()->json(['error' => 'No tienes una solicitud de amistad pendiente de este usuario.'], 400);
        }
    
        if ($friendship->status === 'accepted') {
            return response()->json(['error' => 'Esta solicitud de amistad ya ha sido aceptada.'], 400);
        }
    
        // Actualizar el estado de la solicitud de amistad a "aceptado"
        $friendship->update(['status' => 'accepted']);
    
        return response()->json(['success' => true, 'message' => 'Solicitud de amistad aceptada.'], 200);
    }

    public function cancelFriendRequest(User $friend)
    {
        $existingRequest = Friendship::where('user_id', auth()->id())
                                    ->where('friend_id', $friend->id)
                                    ->first();

        if (!$existingRequest) {
            return response()->json(['error' => 'No tienes una solicitud de amistad pendiente con este usuario.'], 400);
        }

        // Eliminar la solicitud de amistad
        $existingRequest->delete();

        return response()->json(['success' => true, 'message' => 'Solicitud de amistad cancelada.'], 200);
    }

    public function removeFriend(User $friend)
    {
        $friendship = Friendship::where('user_id', auth()->id())
                                ->where('friend_id', $friend->id)
                                ->first();

        if (!$friendship) {
            return response()->json(['error' => 'No tienes una amistad con este usuario.'], 400);
        }

        $friendship->delete();

        return response()->json(['success' => true, 'message' => 'Amistad eliminada.'], 200);
    }

    public function getFriendRequest()
    {
        $user = Auth::user();

        $friendships = $user->pendingfriends;
        
        return response()->json(['success' => true, 'friendships' => $friendships], 200);
    }

    public function getFriends()
    {
        $user = Auth::user();

        // $friendships = $user->friends->concat($user->friends2);
        $friendships = $user->friends()->with(['profile.file'])->get()->merge($user->friends2()->with(['profile.file'])->get());

        return response()->json(['success' => true, 'friends' => $friendships], 200);
    }

    public function getPendingRequest()
    {
        $user = Auth::user();

        $pendingfriendships = $user->pendingrequests;
        
        return response()->json(['success' => true, 'friendships' => $pendingfriendships], 200);
    }
}