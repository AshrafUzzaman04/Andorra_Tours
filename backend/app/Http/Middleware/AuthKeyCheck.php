<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthKeyCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if($request->header("Authorization") == "Bearer ".env("FRONTEND_AUTH_KEY")){
            return $next($request);
        }
        return response()->json(['error' => true, "message" => "Invalid authorization"],403);
    }
}
