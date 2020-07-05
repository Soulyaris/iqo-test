<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalculatorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'calculator-date' => 'required|date',
            'calculator-sum-range' => 'required|integer|min:1000|max:3000000',
            'calculator-time' => 'required|min:1|max:5',
            'calculator-replenish' => 'required|boolean',
            'calculator-replenish-sum' => 'integer|min:1000|max:3000000'
        ];
    }

    public function messages() {
        return [
            'calculator-date.required' => 'Не указана дата',
            'calculator-date.date' => 'Неверный формат даты',
            'calculator-sum-range.required' => 'Не указана сумма вклада',
            'calculator-sum-range.integer' => 'Указанная сумма вклада не является числом',
            'calculator-sum-range.min' => 'Сумма вклада не может быть меньше 1000',
            'calculator-sum-range.max' => 'Сумма вклада не может быть больше 3000000',
            'calculator-time.required' => 'Не указан срок вклада',
            'calculator-time.min' => 'Срок вклада не может быть меньше 1 года',
            'calculator-time.max' => 'Срок вклада не может быть больше 5 лет',
            'calculator-replenish.required' => 'Не указана возможность пополнения вклада',
            'calculator-replenish.boolean' => 'Неверный тип поля Пополнение вклада',
            'calculator-replenish-sum.integer' => 'Указанная сумма пополнения не является числом',
            'calculator-replenish-sum.min' => 'Сумма пополнения не может быть меньше 1000',
            'calculator-replenish-sum.max' => 'Сумма пополнения не может быть больше 3000000'
        ];
    }
}
