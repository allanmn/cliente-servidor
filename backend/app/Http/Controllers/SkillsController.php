<?php

namespace App\Http\Controllers;

use App\Http\Resources\SkillResource;
use App\Models\Skill;

class SkillsController extends Controller
{
    public function index()
    {
        $models = Skill::all();

        return SkillResource::collection($models);
    }
}
