@extends('layouts/app')

@section('page-title')
    Калькулятор вкладов
@endsection

@section('content')
    <section class="main-container">
        <h1 class="calculator-header">
        Калькулятор
        </h1>
        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form class="calculator-form" id="calculator-form" action="/calculator/execute" method="POST">
        <div class="calculator-params">
            <div class="calculator-params-row">
            <label for="calculator-date">Дата оформления вклада</label>
            <input type="text" id="calculator-date" name="calculator-date" value="дд.мм.гггг" required>
            </div>
            <div class="calculator-params-row">
            <label for="calculator-sum">Сумма вклада</label>
            <input type="number" id="calculator-sum" value="10000" min="1000" max="3000000" required>
            <input type="range" id="calculator-sum-range" name="calculator-sum-range" value="10000" min="1000" max="3000000" step="1000">
            <div class="calculator-sum-range-labels">
                <span class="min">1 тыс. руб.</span>
                <span class="max">3 000 000</span>
            </div>
            </div>
            <div class="calculator-params-row">
            <label for="calculator-time">Срок вклада</label>
            <select id="calculator-time" name="calculator-time" required>
                <option value="1" selected>1 год</option>
                <option value="2">2 года</option>
                <option value="3">3 года</option>
                <option value="4">4 года</option>
                <option value="5">5 лет</option>
            </select>
            </div>
            <div class="calculator-params-row">
            <label for="calculator-repelish">Пополнение вклада</label>
            <div id="calculator-replenish">
                <input id="calculator-replenish1" type="radio" name="calculator-replenish" value="no" checked> Нет
                <input id="calculator-replenish2" type="radio" name="calculator-replenish" value="yes"> Да
            </div>
            </div>
            <div class="calculator-params-row">
            <label for="calculator-replenish-sum">Сумма пополнения вклада</label>
            <input type="number" id="calculator-replenish-sum" name="calculator-replenish-sum" value="10000" min="1000" max="3000000">
            <input type="range" id="calculator-replenish-sum-range" value="10000" min="1000" max="3000000" step="1000">
            <div class="calculator-replenish-sum-range-labels">
                <span class="min">1 тыс. руб.</span>
                <span class="max">3 000 000</span>
            </div>
            </div>
        </div>
        <div class="calculator-result">
            <input type="submit" id="calculator-form-submit" value="Рассчитать">
            <span class="calculator-result-label">Результат:</span>
            <div class="calculator-result-value" id="calculator-result-value"></div>
        </div>
        </form>
    </section>
@endsection
