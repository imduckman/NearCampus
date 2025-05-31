(function ($) {

	"use strict";

	// Page loading animation
	$(window).on('load', function () {
		$('#js-preloader').addClass('loaded');
	});

	// WOW JS
	$(window).on('load', function () {
		if ($(".wow").length) {
			var wow = new WOW({
				boxClass: 'wow',      // Animated element css class (default is wow)
				animateClass: 'animated', // Animation css class (default is animated)
				offset: 20,         // Distance to the element when triggering the animation (default is 0)
				mobile: true,       // Trigger animations on mobile devices (default is true)
				live: true,       // Act on asynchronously loaded content (default is true)
			});
			wow.init();
		}
	});

	$(window).on('scroll', function () {
		var scroll = $(this).scrollTop();
		var header = $('header');

		if (scroll > 80) {
			header.addClass('background-header');
		} else {
			header.removeClass('background-header');
		}
	});

	$('.filters ul li').click(function () {
		$('.filters ul li').removeClass('active');
		$(this).addClass('active');

		var data = $(this).attr('data-filter');
		$grid.isotope({
			filter: data
		})
	});

	var $grid = $(".grid").isotope({
		itemSelector: ".all",
		percentPosition: true,
		masonry: {
			columnWidth: ".all"
		}
	})

	// Accordion
	if ($('.accordion-wrapper').length) {
		$('.accordion-wrapper .accordion-item').on('click', function () {
			$('.accordion-wrapper .accordion-item').removeClass('active');
			$(this).addClass('active');
		});
	}

	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}

	// Menu elevator animation
	$('a[href*=\\#]:not([href=\\#]):not([href=\\#no-back-to-top])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				var width = $(window).width();
				if (width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);
				}
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
		$('a.external').on('click', function () {
			window.open($(this).attr('href'));
			return false;
		});
	});

	// Page enjoy (Dropdown menu handling)
	var dropdownOpener = $('.main-nav ul.nav li.has-sub > a');
	if (dropdownOpener.length) {
		dropdownOpener.each(function () {
			var _this = $(this);
			_this.on('tap click', function (e) {
				var thisItemParent = _this.parent('li'),
					thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

				if (thisItemParent.hasClass('has-sub')) {
					var submenu = thisItemParent.find('> ul.sub-menu');
					if (submenu.is(':visible')) {
						submenu.slideUp(450, 'easeInOutQuad');
						thisItemParent.removeClass('is-open-sub');
					} else {
						thisItemParent.addClass('is-open-sub');
						if (thisItemParentSiblingsWithDrop.length === 0) {
							thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
								submenu.slideDown(250, 'easeInOutQuad');
							});
						} else {
							thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
								submenu.slideDown(250, 'easeInOutQuad');
							});
						}
					}
				}
				e.preventDefault();
			});
		});
	}


	// --- 카카오 맵 및 모달 관련 코드 ---
	$(document).ready(function () {
		// Bootstrap 모달을 수동으로 초기화하여 충돌 가능성 줄임
		$('#mapModal').modal({
			show: false, // 처음에는 숨겨져 있도록 설정
			backdrop: true, // 배경 클릭 시 닫기 활성화 (기본값)
			keyboard: true // ESC 키로 닫기 활성화 (기본값)
		});

		// 닫기 버튼 직접 클릭 이벤트 바인딩 (data-dismiss="modal"이 작동하지 않을 경우 대비)
		$('#mapModal .close, #mapModal .btn-secondary[data-dismiss="modal"]').on('click', function () {
			$('#mapModal').modal('hide'); // 모달 강제 닫기
		});


		// Kakao Maps API 로드가 완료되었을 때 실행될 함수를 정의합니다.
		window.kakao.maps.load(function () {
			// **중요: map, ps, markers 변수가 이 콜백 함수 안에 선언되어야 합니다.**
			var mapContainer = document.getElementById('map'); // 지도를 표시할 div

			if (!mapContainer) {
				console.error("Error: #map element not found in HTML. Map cannot be initialized.");
				return;
			}

			// 지도 초기화
			var mapOption = {
				center: new kakao.maps.LatLng(37.3229, 126.8308), // 초기 중심 좌표 (안산시청 근처)
				level: 7 // 초기 확대 레벨
			};
			var map = new kakao.maps.Map(mapContainer, mapOption);
			var ps = new kakao.maps.services.Places();
			var markers = []; // 마커를 담을 배열

			// `.thumb` 클릭 이벤트
			$('.thumb').on('click', function (e) {
				e.preventDefault(); // 기본 링크 동작 방지

				var placeName = $(this).data('placeName'); // data-place-name 속성에서 장소 이름 추출

				if (placeName) {
					// 모달이 표시될 때마다 이벤트 핸들러가 중복되지 않도록 .off() 후 .on()
					$('#mapModal').off('shown.bs.modal').on('shown.bs.modal', function () {
						map.relayout(); // 지도의 크기 재설정
						map.setCenter(new kakao.maps.LatLng(37.3229, 126.8308)); // 모달 열릴 때 초기 중심
						searchPlaces(placeName); // 장소 검색 함수 호출
					});

					$('#mapModal').modal('show'); // 모달 표시
				} else {
					alert("장소 이름을 찾을 수 없습니다. data-place-name 속성을 확인하세요.");
				}
			});

			// 키워드 검색을 요청하는 함수
			function searchPlaces(keyword) {
				removeMarker(); // 기존 마커 제거
				ps.keywordSearch(keyword, placesSearchCB); // 장소 검색 요청
			}

			// 장소검색이 완료됐을 때 호출되는 콜백함수
			// 장소검색이 완료됐을 때 호출되는 콜백함수
			function placesSearchCB(data, status, pagination) {
				if (status === kakao.maps.services.Status.OK) {
					removeMarker(); // 혹시 남아있을 수 있는 이전 마커 모두 제거

					if (data.length > 0) {
						// **여기서 첫 번째 결과(data[0])만 사용하도록 수정합니다.**
						var place = data[0];
						displayMarker(place); // 첫 번째 결과에 대해서만 마커를 표시
						map.setCenter(new kakao.maps.LatLng(place.y, place.x)); // 첫 번째 마커를 지도의 중심으로 설정
						map.setLevel(3); // 적절한 확대 레벨 설정 (예: 3)

						displayPlaceInfo(place); // 첫 번째 검색 결과의 상세 정보 표시
					} else {
						// 검색 결과가 없는 경우
						alert('검색 결과가 존재하지 않습니다.');
						clearPlaceInfo();
						// removeMarker()는 위에서 이미 호출했으므로 필요 없음
						map.setCenter(new kakao.maps.LatLng(37.3229, 126.8308)); // 기본 위치로 복귀
						map.setLevel(7);
					}
				} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
					alert('검색 결과가 존재하지 않습니다.');
					clearPlaceInfo();
					removeMarker();
					map.setCenter(new kakao.maps.LatLng(37.3229, 126.8308));
					map.setLevel(7);
				} else if (status === kakao.maps.services.Status.ERROR) {
					alert('검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
					clearPlaceInfo();
					removeMarker();
				}
			}

			// 지도에 마커를 표시하는 함수
			function displayMarker(place) {
				var marker = new kakao.maps.Marker({
					map: map,
					position: new kakao.maps.LatLng(place.y, place.x),
				});
				markers.push(marker); // 마커 배열에 추가

				// 마커 클릭 시 정보창 표시 (모달 내 정보 업데이트)
				kakao.maps.event.addListener(marker, 'click', function () {
					displayPlaceInfo(place);
				});
			}

			// 검색 결과로 받은 장소 정보를 모달에 표시하는 함수
			function displayPlaceInfo(place) {
				$('#placeName').text(place.place_name);
				$('#placeAddress').text(place.address_name || place.road_address_name || '정보 없음');
				$('#placePhone').text(place.phone || '정보 없음');
				if (place.place_url) {
					$('#placeUrl').attr('href', place.place_url).show();
				} else {
					$('#placeUrl').attr('href', '#').hide();
				}
			}

			// 장소 정보창을 초기화하는 함수
			function clearPlaceInfo() {
				$('#placeName').text('');
				$('#placeAddress').text('');
				$('#placePhone').text('');
				$('#placeUrl').attr('href', '#').hide();
			}

			// 지도 위에 표시되고 있는 마커를 모두 제거하는 함수
			function removeMarker() {
				for (var i = 0; i < markers.length; i++) {
					markers[i].setMap(null);
				}
				markers = [];
			}

			// 모달이 닫힐 때 마커와 정보를 초기화합니다.
			$('#mapModal').on('hidden.bs.modal', function () {
				removeMarker();
				clearPlaceInfo();
				map.setCenter(new kakao.maps.LatLng(37.3229, 126.8308));
				map.setLevel(7);
			});
		}); // window.kakao.maps.load 끝
	}); // $(document).ready 끝
	$(document).ready(function () {
		$('.main-button a').on('click', function () {
			$('.hidden-section').slideDown(300);
			$(this).closest('.main-button').hide();
		});
	});



	document.querySelectorAll('.thumb').forEach(function (thumb) {
		const imgs = thumb.querySelectorAll('.slideshow img');
		let idx = 0;
		let interval = null;

		// 페이지 로딩 시 첫 이미지에 .active
		imgs.forEach((img, i) => img.classList.toggle('active', i === 0));

		function show(n) {
			imgs.forEach((img, i) => img.classList.toggle('active', i === n));
		}

		thumb.addEventListener('mouseenter', function () {
			if (interval) clearInterval(interval);
			let count = imgs.length;
			interval = setInterval(function () {
				idx = (idx + 1) % count;
				show(idx);
			}, 1200);
		});

		thumb.addEventListener('mouseleave', function () {
			clearInterval(interval);
			idx = 0;
			show(0);
		});
	});



})(window.jQuery);