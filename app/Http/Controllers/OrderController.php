<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        $data = $request->validated();
        $items = $data['orderItems'];
        foreach ($items as $item) {
            Order::create([
                'user_id' => $data['userId'],
                'payment' => $data['method'],
                'order_id' => $data['orderId'],
                'phone' => $data['phone'],
                'car_id' => $item['id'],
                'amount' => $item['amount'],
                'price' => $item['price'],
                'total_price' => $item['price'] * $item['amount'],
            ]);
        }

        return response(['data' => $data], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::where('id', $id)
            ->with(['car', 'owner'])
            ->first();
        if ($order) {
            return new OrderResource($order);
        }

        return response('Not found order', 400);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::where('id', $id)->first();
        if ($order) {
            $order->delete();
            return response('', 200);
        }

        return response('Not found order', 400);
    }

    // other function --------------------------------------------------------------
    public function getOrders(Request $request)
    {
        $userId = $request->user()->id;
        if ($userId) {
            $orders = OrderResource::collection(
                Order::where('user_id', $userId)
                    ->with(['owner', 'car'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10)
            );
            return $orders;
        }
        return response('fail', 400);
    }
}
