<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CalculatorRequest;

class Calculator extends Controller
{
    public function calc(CalculatorRequest $request) {

        function countPercents($month, $globalData) {
            if ($month == 1) {
                return $globalData['sum'];
            } else {
                $previousMonth = countPercents($month - 1, $globalData);
                //receiving date values
                $curDate = date_create_from_format('m/d/Y', $globalData['date']);
                $curDate = $curDate->modify('+'.strval($month).' months');
                $curDate = date_format($curDate, 'd-m-Y');
                $curDate = strtotime($curDate);
                $curDateMonth = date("n", $curDate);
                $curDateYear = date("Y", $curDate);
                if (date("L", $curDate)) {
                $curYearDays = 365;
                } else {
                $curYearDays = 366;
                };
                //----
                return $previousMonth + ($previousMonth + $globalData['replenishSum']) * cal_days_in_month(CAL_GREGORIAN, $curDateMonth, $curDateYear) * ($globalData['percent'] / $curYearDays);
            }
        }

        $date = $request->input("calculator-date");
        $sum = intval($request->input("calculator-sum-range"));
        $time = intval($request->input("calculator-time"));
        $replenish = $request->input("calculator-replenish");
        $replenishSum = intval($request->input("calculator-replenish-sum"));

        //$summn = $summn - 1 + ($summn - 1 + $summadd) * $daysn * ($percent / $daysy);
        if ($replenish == false) {$replenishSum = 0;};
        $percent = 10;

        $globalData = [
            'sum' => $sum,
            'replenishSum' => $replenishSum,
            'percent' => $percent,
            'date' => $date
        ];
        $percentsSum = countPercents($time * 12, $globalData);
        echo json_encode(round($percentsSum, 2));
    }
}
