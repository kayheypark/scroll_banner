
let needRedering = true;                               //렌더링이 필요한 페이지의 여부
let pathname = location.pathname;                       //현재페이지 경로
let offsetNodeSelector = null;                          //움직임이 시작될 기준노드 셀렉터
let startTopValue = 0;                                  //보정 탑값 (기준노드에 패딩이 있는 경우 따위에 쓰임)

//현재페이지 경로에 따라서 렌더링하지 않을 페이지를 분기한다.
switch (pathname) {
    //스크롤배너를 사용하지 않을 페이지들..
    case '/bbs/login.php' :             //로그인
    case '/bbs/member_confirm.php' :    //본인확인
    case '/shop/mypage.php' :           //마이페이지
    case '/sub/estimate.php' :          //무료견적서
    case '/shop/personalpay.php' :      //개인결제
    case '/shop/personalpayform.php' :  //개인결제 폼
    case '/bbs/board.php' :             //게시판
    case '/sub/cadalog.php' :           //카달로그신청
    case '/sub/exhibition.php' :        //전시장
    case '/bbs/register.php' :          //회원가입
    case '/bbs/register_form.php' :     //회원가입 폼
    case '/bbs/register_result.php' :   //회원가입완료
    case '/shop/cart.php' :             //장바구니
    case '/shop/orderform.php' :        //주문서작성
        needRedering = false;
        break;
};

window.onload = function () {
    fnRenderScrollBanner('ScrollBanner');
    console.log(pathname);
};

//스크롤배너 렌더링, 박경호, 2022-03-11
const fnRenderScrollBanner = (bannerID) => {

    if (needRedering) { // 렌더링이 필요한 페이지라면

        //배너 엘리먼트 선언
        let bannerTag = `
            <div id="${bannerID}" class="scroll_banner">
                <ul>
                    <li>
                        <a href="javascript: alert('링크 준비중입니다.');" title="">
                            <img src="https://www.hyundailivarthaum.co.kr/theme/ybusiness_1/asset/img/exhibition_hall.png" alt="" />
                        </a>
                    </li>
                </ul>
            </div>
        `;

        //어펜드
        $("body").append(bannerTag);
        
        //배너 노드 주소 할당
        let bannerNode = document.getElementById(bannerID);
        let navHeight = document.querySelectorAll('.header-section')[0].offsetHeight;

        //현재페이지 경로에 따라서 각각 다른 기준노드와 보정탑값을 분기한다.
        switch (pathname) {
            //메인페이지
            case '/' :
                offsetNodeSelector = '.main-view-section';
                startTopValue = 100;
                break;
            //제품리스트
            case '/shop/list.php' :
                offsetNodeSelector = '.main-best-wrap .card-wrap';
                startTopValue = 35;
                break;
            //제품상세
            case '/shop/item.php' :
                offsetNodeSelector = '#sct_location';
                startTopValue = 45;
                break;
            //개인정보처리방침 & 서비스이용약관
            case '/sub/privacy.php' :
            case '/sub/provision.php' :
                offsetNodeSelector = '.sec-padding';
                startTopValue = 70;
                break;
            //FAQ
            case '/bbs/faq.php' :
                offsetNodeSelector = '#faq_sch';
                startTopValue = 50;
                break;
        };

        //결정된 기준노드와 보정탑값에 의해 배너노드의 최초 위치를 적용한다.
        bannerNode.style.transition = 'none';
        setInterval(function(){
            bannerNode.style.transition = 'top 700ms ease-in-out 0s';
        }, 300)
        bannerNode.style.top = document.querySelectorAll(offsetNodeSelector)[0].offsetTop+startTopValue+"px";


        if ( document.getElementById(bannerID) !== null ) {
            //이벤트위임(스크롤 했는데)
            window.addEventListener('scroll', function(event) {


                if ( document.querySelectorAll(offsetNodeSelector)[0].offsetTop+startTopValue > window.scrollY ) { // 아직 기준노드이상 넘어가지 않았다면
                    // 배너노드의 탑값을 고정한다.
                    bannerNode.style.top = document.querySelectorAll(offsetNodeSelector)[0].offsetTop+startTopValue+"px";
                } else { // 그게 아니라면
                    // 배너노드의 탑값을 수정한다.
                    bannerNode.style.top = 35+navHeight+window.scrollY+"px";
                }

            });
        };

    };

};