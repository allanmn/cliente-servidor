<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobAnnouncement extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'ramo_id',
        'empresa_id',
        'titulo',
        'descricao',
        'max_salario',
        'min_salario',
        'ativo',
        'experiencia',
    ];

    public function empresa()
    {
        return $this->belongsTo(User::class, 'empresa_id');
    }

    public function ramo()
    {
        return $this->belongsTo(JobSector::class, 'ramo_id');
    }

    public function competencias()
    {
        return $this->belongsToMany(Skill::class, 'job_announcement_skill', 'job_announcement_id', 'skill_id');
    }
}
