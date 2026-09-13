<?php

namespace App\Modules\User\Presentation\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class AdminLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Chấp nhận email hoặc số điện thoại VN (vd: 0912345678 / +84912345678)
            'login' => [
                'required',
                'string',
                'regex:/^(?:[^\s@]+@[^\s@]+\.[^\s@]+|(?:\+84|0)\d{9,10})$/',
            ],
            'password' => ['required', 'string', 'min:6'],
        ];
    }

    public function messages(): array
    {
        return [
            'login.required' => 'Vui lòng nhập email hoặc số điện thoại.',
            'login.regex' => 'Email hoặc số điện thoại không đúng định dạng.',
            'password.required' => 'Vui lòng nhập mật khẩu.',
            'password.min' => 'Mật khẩu tối thiểu :min ký tự.',
        ];
    }
}
