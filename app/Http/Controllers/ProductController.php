<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $products = Product::latest()->paginate($request->limit);

        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product();

        $product->name = $request->name;
        $product->price = $request->price;
        $product->details = $request->details;
        $product->save();

        return response()->json([
            'success' => true,
            'product_id' => $product->id,
            'message' => 'Product saved!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $product)
    {
        //
        try {
            if (Product::where('id', $product)->doesntExist()) {
                throw new Exception('Product not found!');
            }

            $affected = Product::where('id', $product)->update([
                'name' => $request->name,
                'price' => $request->price,
                'details' => $request->details
            ]);

            return response()->json([
                'success' => true,
                'product_id' => $product,
                'affected' => $affected,
                'message' => 'Product updated!'
            ]);

        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'error' => $error->getMessage(),

            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($product)
    {
        //
        Product::where('id', $product)->delete();

        return response()->json([
            "success" => true,
            "deleted_product" => $product,
            "message" => "Product removed"
        ]);
    }
}