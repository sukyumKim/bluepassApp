/**
 * 만든이 : 수겨미
 */
'use strict';

angular.module('bluepassApp').controller('partnersMainController', partnersMainController);

partnersMainController.$inject = [
    '$timeout',
    '$element',
    'PartnerRequest',
    'Principal',
    'angularLoad',
    'Alert'
];

function partnersMainController( $timeout, $element, PartnerRequest, Principal, angularLoad, Alert) {
    /* 초기화 */
    var $element_wrap;
    $timeout(function () {
        $element_wrap = $element.find("#addrWrap")[0];
    }, 0);
    var vm = this;

    /* 정보입력 */
    vm.isAuthenticated = Principal.isAuthenticated();
    vm.partnerRequestPrams = {
        clubName: null,
        userName: null,
        address: null,
        phoneNumber: null,
        message: null
    };
    vm.addressFormOpen = addressFormOpen;
    vm.addressFormClose = addressFormClose;
    vm.getPartnerRequest = getPartnerRequest;

    /* 주소검색 */
    function addressFormOpen() {
        return angularLoad.loadScript('http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false').then(
            function () {
                daum.postcode.load(function () {
                    // 현재 scroll 위치를 저장해놓는다.
                    var currentScroll = Math.max(document.body.scrollTop,
                        document.documentElement.scrollTop);
                    new daum.Postcode({
                        oncomplete: function (data) {
                            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는
                            // 부분.

                            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                            // 내려오는 변수가 값이 없는 경우엔 공백('')값을
                            // 가지므로,
                            // 이를 참고하여 분기 한다.
                            var fullAddr = data.address; // 최종
                            // 주소
                            // 변수
                            var extraAddr = ''; // 조합형 주소 변수

                            // 기본 주소가 도로명 타입일때 조합한다.
                            if (data.addressType === 'R') {
                                // 법정동명이 있을 경우 추가한다.
                                if (data.bname !== '') {
                                    extraAddr += data.bname;
                                }
                                // 건물명이 있을 경우 추가한다.
                                if (data.buildingName !== '') {
                                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName
                                        : data.buildingName);
                                }
                                // 조합형주소의 유무에 따라 양쪽에 괄호를
                                // 추가하여 최종
                                // 주소를 만든다.
                                fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                            }

                            // 우편번호와 주소 정보를 해당 필드에 넣는다.
                            vm.partnerRequestPrams.zipcode = data.postcode.replace('-', '');
                            /*
                             * $element.find("#zipcode")[0].value =
                             * data.postcode.replace('-',
                             * '');
                             */
                            vm.partnerRequestPrams.address1 = fullAddr;
                            /*
                             * $element.find("#address1")[0].value =
                             * fullAddr;
                             */

                            // iframe을 넣은 element를 안보이게 한다.
                            $element_wrap.style.display = 'none';

                            $element.find("#address1")[0].focus();
                            $element.find("#address2")[0].focus();

                            // 우편번호 찾기 화면이 보이기 이전으로 scroll
                            // 위치를
                            // 되돌린다.
                            document.body.scrollTop = currentScroll;
                        },
                        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를
                        // 작성하는
                        // 부분. iframe을 넣은 element의 높이값을
                        // 조정한다.
                        onresize: function (size) {
                            $element_wrap.style.height = size.height + "px";
                        },
                        width: '100%',
                        height: '100%'
                    }).embed($element_wrap);

                    // iframe을 넣은 element를 보이게 한다.
                    $element_wrap.style.display = 'block';
                });
            }).catch(function () {
                alert("일시적인 오류가 발생하였습니다. 회사에 문의해주세요!");
            });
    }

    function addressFormClose() {
        // iframe을 넣은 element를 안보이게 한다.
        $element_wrap.style.display = 'none';
    }

    function getPartnerRequest() {
        if (!vm.isAuthenticated) {
            return Alert.alert1('로그인 먼저 해주세요!');
        }
        if (vm.partnerRequestPrams.id != null) {
            return PartnerRequest.update(vm.partnerRequestPrams).$promise.then(function () {
                Alert.alert1('문의가 완료되었습니다.');
            }).catch(function () {
                Alert.alert1('이런...문의가 안 되었어요. 다시 문의해주세요.')
            })
        } else {
            return PartnerRequest.save(vm.partnerRequestPrams).$promise.then(function () {
                Alert.alert1('문의가 완료되었습니다.');
            }).catch(function () {
                Alert.alert1('이런...문의가 안 되었어요. 다시 문의해주세요.')
            })
        }
    }
}
