<?php

namespace App\Modules\Hotel\Presentation\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/*
-> Validate request từ client truyền vào
*/

class UploadImagesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Cho phép thực hiện request này
    }

    public function rules(): array
    {
        return [
            'images'   => ['required', 'array', 'min:1', 'max:10'],
            // 'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ];
    }

    public function messages()
    {
        return [
            'images.required' => 'Không tìm thấy ảnh.!',
            'images.array' => 'Truyền sai dữ liệu (images is array)',
            // 'images.*.mimes' => 'Định dạng không được hỗ trợ (jpg,jpeg,png,webp)',
        ];
    }
}
