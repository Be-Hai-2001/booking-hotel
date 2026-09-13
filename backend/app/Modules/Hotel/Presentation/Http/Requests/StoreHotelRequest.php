<?php

namespace App\Modules\Hotel\Presentation\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'sdt' => 'nullable|string|max:20',
            'ward_id'           => ['required', 'integer', 'exists:wards,id'], // 👈 Sửa ở đây
            'diaChiChiTiet'     => ['nullable', 'string'],
            'diaChiSnapshot'    => ['required', 'string'],
        ];
    }
}
