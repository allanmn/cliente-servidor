<?php

namespace App\Http\Middleware;

use App\Models\Token;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'mensagem' => 'Não autenticado.',
            ], 401);
        }

        $model = Token::where('token', $token)->first();

        if (!$model) {
            return response()->json([
                'mensagem' => 'Token inválido.',
            ], 401);
        }

        return $next($request);
    }
}
