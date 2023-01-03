$(function () {
    //변수 선언 및 할당------------------------------------------------------------------------------------------------------------------------
    //0. 공통
    const body = $("body");
    let wW = window.innerWidth;
    let wH = window.innerHeight;
    //1. 헤더
    const mainHd = $("#pwc-hd")
    //1-1. gnb
    const gnbCt = $(".gnb-container")
    const gnb = $("#gnb")
    const gd1 = $(".gnb-depth1")
    const gd2 = $(".gnb-depth2")
    const gd2c = $(".gnb-depth2 > a")
    //1-2. 햄버거 메뉴와 사이트맵
    const ham = $(".ham")
    const stmClose = $(".close-btn")
    const stm = $(".sitemap-wrapper")
    const stmsbm = $(".stm-submenu")
    const stmd2 = $(".stm-depth2")
    //1-3. 모바일 gnb
    const mGnbCt = $(".m-gnb-container")
    const mGd1 = $(".m-gnb-depth1")
    const mGd1c = $(".m-gnb-depth1 > a")
    const mGnbSbm = $(".m-gnb-submenu")
    const mGd2 = $(".m-gnb-depth2")
    //1-4. 모바일 햄버거 메뉴
    const mHam = $(".m-ham")
    const mModal = $(".m-modal")
    const mCloseBtn = $(".m-close-btn")

    //2. 메인
    //2-1. 메인배너
    const mbwrp = $(".mb-wrapper")
    let mbwrpCount = $(mbwrp.length);
    const prevBtn = $(".prev-btn")
    const nextBtn = $(".next-btn")
    const mbPgnBtn = $(".mb-pgn")

    //2-2. 비지니스
    const bml = $(".busi-menu > li")
    const busiT = $(".busi-title")
    const busiC = $(".busi-contents")
    const busiCdl = $(".busi-contents dl")

    //2-3. 포트폴리오
    const pfT = $(".pf-tab")

    //2-4 함께하는 PWC
    let scTop = 0;






    //페이지 최초 로드 시
    rwd();
    gnbWide();
    mHdCancel();
    sitemapCancel();

    //resize >> 화면의 사이즈가 변할때마다 실행할 함수들 모음
    $(window).resize(function () {
        rwd();
        gnbWide();
        mHdCancel();
        sitemapCancel();
    })


    //1.헤더
    //1-1. gnb
    gd1.hover(function () {
        $(this).siblings().children().removeClass("active");
        $(this).children().addClass("active");      //호버 시 depth1 하단에 라인 생성 및 depth2 보이기
        $(this).siblings().find(gd2c).stop().fadeOut(0);        //호버 시 depth2 하위요소들 보이기
        $(this).find(gd2c).stop().fadeIn(500);

    });
    gd1.mouseleave(function () {
        $(this).children().removeClass("active");   //마우스 gnb에서 빠지면 다 들어가게 하기(라인, depth2등등)
        $(this).find(gd2c).stop().fadeOut(0);
    });

    //1-2. 햄버거 메뉴와 사이트맵
    ham.click(function () {
        $(stm).stop().fadeIn(200);
    });
    stmClose.click(function () {
        $(stm).stop().fadeOut(200);
    });
    stmd2.hover(function () {
        $(this).parent().parent().siblings().find(stmd2).children().removeAttr("style");
        $(this).siblings().children().removeAttr("style");
        $(this).children().css("font-weight", "700");
    });
    stmd2.mouseleave(function () {
        $(this).children().removeAttr("style");
    });

    //1-3. 모바일 헤더
    mHam.click(function () {
        $(body).css("overflowY", "hidden");
        $(mGnbCt).parent().addClass("active");
        $(mModal).stop().fadeIn(200);
    });
    mCloseBtn.click(function () {
        $(body).removeAttr("style");
        $(mGnbCt).parent().removeClass("active");
        $(mModal).stop().fadeOut(200);
    });

    //1-4. 모바일 gnb
    mGd1c.click(function () {
        if ($(this).parent().find(mGnbSbm).hasClass("on")) {
            $(this).parent().find(mGnbSbm).stop().slideUp(400).removeClass("on");
        } else {
            $(mGnbSbm).stop().slideUp(400).removeClass("on");
            $(this).parent().find(mGnbSbm).stop().slideDown(400).addClass("on");
        }
    });

    mGd2.mouseenter(function () {
        $(mGd1).siblings().find(mGd2).children().removeClass("active");
        $(this).siblings().children().removeClass("active");
        $(this).children().addClass("active");
    });

    mGd2.mouseleave(function () {
        $(this).children().removeClass("active");
    });


    //2.메인
    //2-1. 메인배너
    //2-1-1. 메인배너 슬라이드
    let i = 0;
    $(prevBtn).click(function () {
        if (i >= (-2) && i < 0) {
            $(mbwrp).css({ transform: `translateX(calc(${i + 1}00% / 3))` });
            $(`.mb-pgn0${Math.abs(i)}`).siblings().removeClass("active");
            $(`.mb-pgn0${Math.abs(i)}`).addClass("active");
            i += 1;
        } else {
            $(mbwrp).css({ transform: `translateX(${i - 66.6667}%)` });
            $(`.mb-pgn03`).siblings().removeClass("active");
            $(`.mb-pgn03`).addClass("active");
            i -= 2;
        }
    });

    $(nextBtn).click(function () {
        if (i > (-2) && i <= 0) {
            $(mbwrp).css({ transform: `translateX(calc(${i - 1}00% / 3))` });
            $(`.mb-pgn0${Math.abs(i - 2)}`).siblings().removeClass("active");
            $(`.mb-pgn0${Math.abs(i - 2)}`).addClass("active");
            i -= 1;
        } else {
            $(mbwrp).css({ transform: `translateX(0%)` });
            $(`.mb-pgn01`).siblings().removeClass("active");
            $(`.mb-pgn01`).addClass("active");
            i = 0;
        }
    });
    //2-1-2. 메인배너 페이지네이션
    mbPgnBtn.click(function () {      //클릭하면 페이지네이션 색 바꾸기
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    //클릭하면 페이지네이션에 해당하는 배너로 이동하기
    $(".mb-pgn01").click(function () {
        $(mbwrp).css({ transform: `translateX(0%)` });
    });
    $(".mb-pgn02").click(function () {
        $(mbwrp).css({ transform: `translateX(-33.3333%)` });
    });
    $(".mb-pgn03").click(function () {
        $(mbwrp).css({ transform: `translateX(-66.6667%)` });
    });


    //2-2. 비지니스
    //메뉴를 클릭하면 클릭한 메뉴가 강조되어 표시
    bml.click(function () {
        $(this).siblings().children().removeClass("active");
        $(this).children().addClass("active");
        return false;
    });

    //메뉴를 클릭하면 각각의 메뉴에 해당하는 컨텐츠를 불러옴
    $(".busi-menu-consulting").click(function () {
        busiT.removeClass("active");
        $(".busi-title-consulting").addClass("active");
        busiC.removeClass("active");
        $(".busi-contents-consulting-wrap").addClass("active");
    });

    $(".busi-menu-education").click(function () {
        busiT.removeClass("active");
        $(".busi-title-education").addClass("active");
        busiC.removeClass("active");
        $(".busi-contents-education-wrap").addClass("active");
    });

    $(".busi-menu-facilitation").click(function () {
        busiT.removeClass("active");
        $(".busi-title-facilitation").addClass("active");
        busiC.removeClass("active");
        $(".busi-contents-facilitation-wrap").addClass("active");
    });

    $(".busi-menu-town").click(function () {
        busiT.removeClass("active");
        $(".busi-title-town").addClass("active");
        busiC.removeClass("active");
        $(".busi-contents-town-wrap").addClass("active");
    });

    $(".busi-menu-evc").click(function () {
        busiT.removeClass("active");
        $(".busi-title-evc").addClass("active");
        busiC.removeClass("active");
        $(".busi-contents-evc-wrap").addClass("active");
    });

    //각 컨텐츠 내용에 마우스 호버 시 내용 노출
    busiCdl.mouseenter(function () {
        $(this).addClass("active");
        $(this).children().addClass("active");
        $(this).children("dd").stop().fadeIn(500);
    });

    busiCdl.mouseleave(function () {
        $(this).removeClass("active");
        $(this).children().removeClass("active");
        $(this).children("dd").stop().fadeOut(100);
    });

    //2-3. 포트폴리오
    //포트폴리오 각 분야에 마우스 호버시 효과 주기
    pfT.mouseenter(function () {
        $(this).children("a").addClass("active");
    });

    pfT.mouseleave(function () {
        $(this).children("a").removeClass("active");
    });

    //2-4. 함께하는 PWC
    //각 기기별로 적당한 위치에 스크롤 되면 숫자가 카운트 되는 이벤트함수
    $(document).scroll(function () {
        scTop = $(document).scrollTop();
        if (body.hasClass("pc") && scTop > 1850 && scTop <= 1910) {
                togeCount();
        } else if (body.hasClass("tab") && scTop > 1750 && scTop <= 1810) {
                togeCount();
        } else if (body.hasClass("mo") && scTop > 1800 && scTop <= 1900) {
            togeCount();
        }
    });


    //함수-----------------------------------------------------------------------------------------------------------------------------------------------
    //0. 공통
    //화면의 사이즈를 측정하는 함수(너비를 측정해서 body에 어떤 클래스를 뿌려줄 지 결정)
    function rwd() {
        wW = window.innerWidth;
        wH = window.innerHeight;
        if (wW < 768) {
            body.addClass("mo").removeClass("tab pc");
        } else if (wW >= 768 && wW < 1280) {
            body.addClass("tab").removeClass("mo pc");
        } else {
            body.addClass("pc").removeClass("mo tab");
        }
    }

    //1. 헤더
    //모바일이 아닐 때 gnb에 마우스가 호버되면 헤더 높이 변동
    function gnbWide() {
        gnb.mouseenter(function () {
            if (!body.hasClass("mo")) {
                mainHd.addClass("active");
            }
        });
        gnb.mouseleave(function () {
            if (!body.hasClass("mo")) {
                mainHd.removeClass("active");
            }
        });
    }

    //모바일 상태에서 벗어나면 모바일일 때 실행되고 있던 모든 동작의 제어를 취소
    function mHdCancel() {
        if (!body.hasClass("mo")) {
            body.removeAttr("style");
            mGnbSbm.hide();
            $(".m-hd-wrapper").find("nav").removeClass("active");
            mModal.removeAttr("style");
        }
    }

    //모바일 상태가 되면 pc나 태블릿 환경에서 실행되고 있던 사이트맵 끄기
    function sitemapCancel() {
        if (body.hasClass("mo")) {
            stm.removeAttr("style");
        }
    }

    //2-4. 함께하는 PWC

    //숫자 1000단위마다 콤마를 찍어줄 함수
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  //화면이 보일 때 실행할 count 이벤트
    function togeCount() {
        $({ val: 0 }).animate({ val: 200 }, {
            duration: 500,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".toge-inner-town").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".toge-inner-town").text(num);
            }
        });

        $({ val: 0 }).animate({ val: 48000 }, {
            duration: 700,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".toge-inner-time").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".toge-inner-time").text(num);
            }
        });

        $({ val: 0 }).animate({ val: 20000 }, {
            duration: 1000,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".toge-inner-people").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".toge-inner-people").text(num);
            }
        });
    }
});
