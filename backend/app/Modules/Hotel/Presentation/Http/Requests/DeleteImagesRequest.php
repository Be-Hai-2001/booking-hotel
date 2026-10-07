<?php

namespace App\Modules\Hotel\Presentation\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/*
-> Validate request từ client truyền vào
*/

class DeleteImagesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Cho phép thực hiện request này
    }

    public function rules(): array
    {
        return [
            'images'   => ['required', 'array', 'min:1'],
            // 'images.*' => ['integer|distinct|exists:hotel_images,id'],
            'images.*' => ['integer', 'distinct', 'exists:hotel_images,id'],
        ];
    }

    public function messages()
    {
        return [
            'images.required' => 'Không tìm thấy ảnh.!',
            'images.array' => 'Dữ liệu đầu vào không phù hợp (array)',
            'images.min' => 'Dữ liệu đầu vào rỗng!',

            'images.*.integer' => 'Dữ liệu đầu vào không phù hợp!',
            'images.*.exists' => 'Mã hình ảnh trong mảng không tồn tại!',
        ];
    }
}
