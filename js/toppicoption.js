jQuery(document).ready(function(){
  //顶部伸展广告
  if(jQuery("#js_ads_banner_top_slide").length){
    var jQueryslidebannertop = jQuery("#js_ads_banner_top_slide"),jQuerybannertop = jQuery("#js_ads_banner_top");
    setTimeout(function(){
      jQuerybannertop.slideUp(1000);
      jQueryslidebannertop.slideDown(1000);
    },100);
    setTimeout(function(){
      jQueryslidebannertop.slideUp(10000,function(){
        jQuerybannertop.slideDown(10000);
      });
    },50000);
        
        jQuerybannertop.mouseenter(function(){
            jQuerybannertop.hide();
      jQueryslidebannertop.show();
            
        });
        jQueryslidebannertop.mouseleave(function(){
            jQueryslidebannertop.slideUp(1000,function(){
      jQuerybannertop.show();
                
    });
        })
  }
});