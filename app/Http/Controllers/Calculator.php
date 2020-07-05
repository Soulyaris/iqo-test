<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Calculator extends Controller
{

    public function calc(Request $request) {

        function checkNumber($num, $min=0, $max=1) {
            try {
                if (!(intval($num))) throw new Exception("Неверный формат числа");
                if ($num < $min || $num > $max) throw new Exception("Значение находится за границами диапазона ".min.":".max);
            }
            catch(Exception $e) {
                return $e->getMessage();
            }
        return "no errors";
        }

        try {
            $date = $request->input("calculator-date");
            $sum = intval($request->input("calculator-sum-range"));
            $time = intval($request->input("calculator-time"));
            $replenish = $request->input("calculator-replenish");
            $replenishSum = intval($request->input("calculator-replenish-sum"));

            $checkResult = "";

        if (!((bool)strtotime($date))) throw new Exception("Неверный формат даты");

        $checkResult = checkNumber($sum, 1000, 3000000);
        if ($checkResult != "no errors") throw new Exception($checkResult);

        $checkResult = checkNumber($time, 1, 5);
        if ($checkResult != "no errors") throw new Exception($checkResult);

        if ($replenish != "no" && $replenish != "yes") {
            throw new Exception("Неверный формат переключателя");
        } else {
            $checkResult = checkNumber($replenishSum, 1000, 3000000);
            if ($checkResult != "no errors") throw new Exception($checkResult);
        }
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        function countPercents($month) /*use($sum, $replenishSum, $percent)*/{
            global $sum, $replenishSum, $percent, $date;

            if ($month == 1) {
                return $sum;
            } else {
                $previousMonth = countPercents($month - 1);
                //receiving date values
                $curDate = date_create_from_format('m/d/Y', $date);
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
                return $previousMonth + ($previousMonth + $replenishSum) * cal_days_in_month(CAL_GREGORIAN, $curDateMonth, $curDateYear) * ($percent / $curYearDays);
            }
        }

        //$summn = $summn - 1 + ($summn - 1 + $summadd) * $daysn * ($percent * $daysy);
        if ($replenish == "no") {$replenishSum = 0;};
        $percent = 10;
        $percentsSum = countPercents($time * 12);
        echo json_encode(round($percentsSum, 2));
    }
}
