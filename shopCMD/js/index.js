define(function (require) {
	var hoss = require('hoss'),
		imageHost=hoss.imageHost;

	var $ = require('jquery');

	var rest_url = require('scripts/rest-url'),
		URL = rest_url.restUrl;

	var navPopover = require('scripts/nav-popover');

	var xhr = require('xhr'),
		jsonp = xhr.jsonp,
		failCallback = xhr.fail,
		doneCallback = xhr.done;

	var template = require('template');


	$(document).ready(function () {
		var bannerHtml = '<a href="yd-mall.html"><img src="../asset/image/banner/banner1-1/banner-0.png" /></a>'
			+'<a href="yd-mall.html"><img src="../asset/image/banner/banner1-1/banner-1.png" /></a>'
			+'<a href="yd-mall.html"><img src="../asset/image/banner/banner1-1/banner-3.gif" /></a>'
			+'<a href="yd-mall.html"><img src="../asset/image/banner/banner1-1/banner-4.gif" /></a>'
			+'<a href="yd-mall.html"><img src="../asset/image/banner/banner1-1/banner-2.png" /></a>';

		$('.banner-img').append(bannerHtml);
		//轮播图
		$('.banner-img').bxSlider({
			auto: true,
			autoHover: true,
			controls: false
		});

		var $resultDiv=$('#resultDiv'),
			$mediaList=$('#mediaList'),
			$iBuildWeb = $("#iBuildWeb"),
			$iCampaign = $("#iCampaign"),
			$iCooperation = $('#iCooperation');

		/* $iBuildWeb.attr('href', URL.web_offi_cash);
		 $iCampaign.attr('href',URL.web_open_cash);
		 $iCooperation.attr('href',URL.web_dms_cash);*/


		getcontent( URL.website_case,1,'resultTemplate',$resultDiv);
		getcontent( URL.website_case,3,'mediaTemplate',$mediaList);

		function getcontent(url,site,templateName,goal){
			var template = require('template');
			$.ajax($.extend({
				url : url,
				data:{
					site:site
				},
				beforeSend: function () {
				}
			}, jsonp))
				.done(function (data) {
					function useful(data) {
						var dataObj = data.data || {};
						var templateId = ($.isArray(dataObj.content) && dataObj.content.length) ? templateName : 'messageTemplate';

						data.data.imageHost=imageHost;
						// 显示数据
						goal.html(template(templateId,data));

						var $showCaseLi= $(".show-case li"),
							$showCase= $(".show-case");

						//经典案例
						$showCaseLi.hover(function(){
							$(this).find("span").stop(true,true).fadeIn();
						},function(){
							$(this).find("span").stop(true,true).fadeOut();
						});

						//经典案例-左右滑动
						var max = 3;
						var slider = $showCase.bxSlider({
							pager: false,
							slideWidth: 324,
							minSlides: 3,
							maxSlides: max,
							moveSlides: 3,
							slideMargin:40,
							infiniteLoop:false,
							autoControls:true,
							onSliderLoad:function(currIndex){	//第一次加载
								$(".bx-prev").css("background-position","0 0");
								$(".bx-next").css("background-position","0 -120px");
							},
							onSlideBefore:function($slideElement, oldIndex, newIndex){
								newIndex+=1;
								var currSlider = slider.getCurrentSlide();
								var sliderCount = slider.getSlideCount();
								var end = Math.ceil(sliderCount/max);
								if(newIndex == 1){
									//第一页样式
									$(".bx-prev").css("background-position","0 0");
									$(".bx-next").css("background-position","0 -120px");
								}else if(newIndex == end){
									//最后一页样式
									$(".bx-prev").css("background-position","0 -60px");
									$(".bx-next").css("background-position","0 -180px");
								}else{
									//中间样式
									$(".bx-prev").css("background-position","0 -60px");
									$(".bx-next").css("background-position","0 -120px");
								}
							}
						});

					}

					function useless(data) {
					}

					doneCallback.call(this, data, useful, useless);
				})
				.fail(function (data) {
					failCallback.call(this, jqXHR, '获取列表数据失败！');
				})
				.always(function () {
				});
		}



	});
	$.ajax($.extend({
		url: URL.faq_list,
		data: {

		},
		beforeSend: function () {
		}
	}, jsonp))
		.done(function (data) {
			function useful(data) {
				if (data.status == 1) {
					var data1=data.data;
					var html0='<li><p class="icon"><span> </span></p><div class="content"><h3>开始使用</h3>',
						html1='<li><p class="icon"><span> </span></p><div class="content"><h3>营销开放平台</h3>',
						html2='<li><p class="icon"><span> </span></p><div class="content"><h3>媒体合作</h3>',
						html3='<li><p class="icon"><span> </span></p><div class="content"><h3>品牌综合商城</h3>',
						html4='<li><p class="icon"><span> </span></p><div class="content"><h3>官网商城</h3>',
						html5='<li><p class="icon"><span> </span></p><div class="content"><h3>多用户商城</h3>',
						html6='</div></li>';
					for(var i=0;i<data1.length;i++){
						if(data1[i].category==0){
							html0+='<span>'+data1[i].title+'</span>';
						}else if(data1[i].category==2){
							html1+='<span>'+data1[i].title+'</span>';
						}else if(data1[i].category==3){
							html2+='<span>'+data1[i].title+'</span>';
						}else if(data1[i].category==4){
							html3+='<span>'+data1[i].title+'</span>';
						}else if(data1[i].category==5){
							html4+='<span>'+data1[i].title+'</span>';
						}else if(data1[i].category==6){
							html5+='<span>'+data1[i].title+'</span>';
						}
					}
					$("#questionList").append(html0+html6);
					$("#questionList").append(html1+html6);
					$("#questionList").append(html2+html6);
					$("#questionList").append(html3+html6);
					$("#questionList").append(html4+html6);
					$("#questionList").append(html5+html6);
				}
			}
			function useless(data) {
				alert(data.detail || '获取数据失败！');
			}

			doneCallback.call(this, data, useful, useless);
		})
		.fail(function (jqXHR) {
			failCallback.call(this, jqXHR, '获取列表数据失败！');
		})
		.always(function () {
		});
	$(document).on('click','#questionList li',function(){
		var thisIndex=$(this).index();
		console.log(thisIndex);
		localStorage.setItem("catgroy",thisIndex);
		window.location.href="question.html";
	});
});