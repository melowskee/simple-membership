<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'company_id', 'email', 'phone', 'address'];

    /**
     * Get the company that owns the branch.
     */
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
