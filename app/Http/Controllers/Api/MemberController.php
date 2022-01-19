<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Member;
use App\Models\Photo;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MemberResource::collection(Member::with('branch')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MemberRequest $request)
    {
        $member = Member::create($request->validated());
        if($request->file()) {

            $file_name = time().'_'.$request->file->getClientOriginalName();
            $file_path = $request->file('file')->storeAs('photos', $file_name, 'public');
            $photo = new Photo;
            $photo->member_id = $member->id;
            $photo->name = time().'_'.$request->file->getClientOriginalName();
            $photo->path = '/storage/' . $file_path;
           /* $name = $request->file('photo')->getClientOriginalName();
            $path = $request->file('photo')->store('photos');
            
            $photo->name = $name;
            $photo->path = $path;
            $photo->user_id = auth()->user()->id;*/
            $photo->save();
        }
        
        return new MemberResource($member);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function show(Member $member)
    {
        return new MemberResource($member);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function update(MemberRequest $request, Member $member)
    {
        $member->update($request->validated());

        return new MemberResource($member);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function destroy(Member $member)
    {
        $member->delete();

        return response()->noContent();
    }
}
