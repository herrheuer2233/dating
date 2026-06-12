
$(document).ready(function(){function scroll(){$("html, body").animate({scrollTop:$(document).height()},1700);}
scroll();var $btnNext=$('.step-btn');var currentStep=0;var $step=$('.step-item');var totalStep=$step.length;var totalSlides=$('.slider-item').length;var currentSlide=1;$btnNext.not('.submit-btn').on('click',function(){currentStep++;$step.removeClass('visible').eq(currentStep).addClass('visible').next().addClass('preload');$('.slider-item').removeClass('active').eq(currentSlide).addClass('active');if(currentSlide<totalSlides-1){currentSlide++;}
else{currentSlide=0;}
$('.slider-item.preload').next().addClass('preload');scroll();});$('.checkbox-item').on('click',function(){if($(this).siblings('.checked').length<3){$(this).toggleClass('checked tr-selected');}
else{$(this).addClass('checkbox-item-error');setTimeout(function(){$(this).removeClass('checkbox-item-error');}.bind(this),300);}});});
