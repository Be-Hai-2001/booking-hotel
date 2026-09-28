<?php

namespace App\Modules\Hotel\Presentation\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/*
-> Validate request từ client truyền vào
*/

class StoreHotelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Cho phép thực hiện request này
    }

    public function rules(): array
    {
        return [
            'hotel_name' => 'required|string|max:255',
            'is_floating_hotel' => 'nullable|boolean',
            'sdt' => 'required|string|max:20',
            // 'ward_id' => 'required|integer|exists:wards,id',
            'ward_id'  => [
                'required',
                'integer',
                Rule::unique('hotels', 'ward_id')->where(function ($query) {
                    return $query->where('ward_id', request('ward_id'));
                }),
            ],
            'diaChiChiTiet' => [
                'required',
                'string',
            ],
            // 'diaChiSnapshot'
        ];
    }

    public function messages()
    {
        return [
            'ward_id.unique' => 'Địa chỉ này đã được đăng ký!',
        ];
    }
}
