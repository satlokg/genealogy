<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Geneology;
use App\User;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $data[Auth::user()->name]['siblings']=Auth::user()->siblings->toArray();
        $data[Auth::user()->name]['childs']=Auth::user()->childs->toArray();
        $data[Auth::user()->name]['parents']=Auth::user()->parents->toArray();
       foreach ($data[Auth::user()->name]['siblings'] as $key => $value) { 
           $data[Auth::user()->name]['siblings'][$key][$value['name']]=Auth::user()->releted($value['id'])->toArray();
       }
       dd($data);
        return view('home');
    }

     public function autocomplete(Request $request)
    {
        $search = $request->get('term');
      
          $result = User::where('name', 'LIKE', '%'. $search. '%')->where('id','!=',Auth::user()->id)->get();
 
          return response()->json($result);
    }

    
    public function geneology(Request $r)
    {
        $u=User::where('email',$r->user)->first();
        $gen=new Geneology();
        $gen->user_id=Auth::user()->id;
        $gen->node_id=$u->id;
        $gen->relation=$r->relation;
        $gen->save();
        return redirect()->back();
    }
}
