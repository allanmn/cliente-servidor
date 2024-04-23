<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobSectorResource;
use App\Models\JobSector;

class JobSectorsController extends Controller
{
    public function index()
    {
        $models = JobSector::all();

        return JobSectorResource::collection($models);
    }
}
