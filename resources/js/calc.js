$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

//---Range sync

let calculatorSum = document.getElementById("calculator-sum");
let calculatorReplenishSum = document.getElementById("calculator-replenish-sum");
let calculatorSumRange = document.getElementById("calculator-sum-range");
let calculatorReplenishSumRange = document.getElementById("calculator-replenish-sum-range");

calculatorSum.addEventListener('change', function(e) {
  calculatorSumRange.value = calculatorSum.value;
})

calculatorSumRange.addEventListener('change', function(e) {
  calculatorSum.value = calculatorSumRange.value;
})

calculatorReplenishSum.addEventListener('change', function(e) {
  calculatorReplenishSumRange.value = calculatorReplenishSum.value;
})

calculatorReplenishSumRange.addEventListener('change', function(e) {
  calculatorReplenishSum.value = calculatorReplenishSumRange.value;
})

$( function() {
    $( "#calculator-date" ).datepicker();
  } );

//---

//---Form sending
$( '#calculator-form' ).submit(function() {
  //  console.log($("#calculator-date")[0].value);
  try {
      function checkNumber(num, min=0, max=1) {
        try {
          if (isNaN(num)) throw Error("Неверный формат числа");
          if (num < min || num > max) throw Error("Значение находится за границами диапазона "+min+":"+max);
        }
        catch(e) {
          return e.message;
        }
        return "no errors";
      }

      let date = new Date($("#calculator-date")[0].value);
      let sum = $("#calculator-sum")[0].value;
      let sumMin = $("#calculator-sum")[0].min;
      let sumMax = $("#calculator-sum")[0].max;
      let time = $("#calculator-time")[0].value;
      let replenish = $("[name=calculator-replenish]")[0].value;
      let replenishSum = $("#calculator-replenish-sum")[0].value;
      let replenishSumMin = $("#calculator-replenish-sum")[0].min;
      let replenishSumMax = $("#calculator-replenish-sum")[0].max;

      let checkResult = "";

      if (!(date instanceof Date && !isNaN(date))) throw Error("Неверный формат даты");

      checkResult = checkNumber(sum, sumMin, sumMax);
      if (checkResult != "no errors") throw Error(checkResult);

      checkResult = checkNumber(time, 1, 5);
      if (checkResult != "no errors") throw Error(checkResult);

      if (replenish != "no" && replenish != "yes") {
        throw Error("Неверный формат переключателя");
      } else {
        checkResult = checkNumber(replenishSum, replenishSumMin, replenishSumMax);
        if (checkResult != "no errors") throw Error(checkResult);
      }
    }
    catch(e) {
      $('#calculator-result-value').html(e.message);
      return false;
    }
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        success: function(response) {
            $('#calculator-result-value').html(response+" руб");
        }
    });
    return false;
});
//----
