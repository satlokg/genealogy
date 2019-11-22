@extends('layouts.admin')
@section('css')
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
@endsection
@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!
                   
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                               
                </div>

                <div class="card-body">
                   
                  <div class="col-md-4">
                    <form action="{{route('geneology.post')}}" method="post">
                        @csrf
                   <div class="form-group">
                      <label class="col-form-label col-form-label-sm" for="inputSmall">Small input</label>
                      <div class="atbd_seach_fields_wrapper">
                         <input class="form-control form-control-sm" type="text"  id="search" placeholder="Find user" id="inputSmall" name="user">
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-form-label col-form-label-sm" for="inputSmall">Small input</label>
                       <select class="form-control" name="relation">
                           <option value="3">Child</option>
                           <option value="1">Parent</option>
                           <option value="2">Sibling</option>
                           <option value="4">Wife</option>
                       </select>
                    </div>
                    <button type="submit" class="btn btn-info btn-sm">Add</button>
                    </form>
                    </div>

                    <div class="col-md-8 text-center">
                       <!--  @php
                        $childs = Auth::user()->nodes->filter(function ($item, $key) {
                            return $item->pivot->relation==3;
                        });
                        $parents = Auth::user()->nodes->filter(function ($item, $key) {
                            return $item->pivot->relation==1;
                        });
                        $siblings = Auth::user()->nodes->filter(function ($item, $key) {
                            return $item->pivot->relation==2;
                        });
                        @endphp -->

                        {{Auth::user()->name}}->
                        @foreach(Auth::user()->siblings as $node)
                                {{$node->name}}->{{$node->releted($node->id)}}</br>

                        @endforeach
                       
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

@endsection
@section('js')
<script type="text/javascript">
       var SITE_URL = {!! json_encode(url('/')) !!}      
    </script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<script>

 $(document).ready(function() {
    $( "#search" ).autocomplete({
 
        source: function(request, response) {
            $.ajax({
            url: "{{url('autocomplete')}}",
            data: {
                    term : request.term
             },
            dataType: "json",
            success: function(data){
               var resp = $.map(data,function(obj){
                    console.log(obj.email);
                    return obj.email;
               }); 
 
               response(resp);
            }
        });
    },
    minLength: 1
 });
});
 
</script> 
@endsection
