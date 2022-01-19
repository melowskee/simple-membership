<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Branch;

class Member extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'branch_id', 'email', 'phone', 'address'];

    /**
     * Get the company that owns the branch.
     */
    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id');
    }
}
