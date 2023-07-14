let clear = new Array(10).fill(false);
let select;       // 문제 번호
let answer = "";        // 현재 문제의 정답
let clear_total = 1;        // 푼 문제 개수 - 1
let time_left = 60;     // 한 문제당 시간 제한
let time_total = 0;     // 모든 문제를 푸는 데 걸리는 시간
let interval;
let total_interval;
document.querySelector('#check').addEventListener('click', check_word);     // check word 클릭 시 동작
document.querySelector('#refresh').addEventListener('click', refresh);      // refresh word 클릭 시 동작
const URLSearch = new URLSearchParams(location.search);
let nickname = URLSearch.get('name');      // 입력한 닉네임 가져오기

total_interval = setInterval(()=> {time_total++;}, 1000);
new_q();

// 랜덤하게 문제 번호 뽑기 (0~6)
function select_q() {
    while(true) {
        select = Math.floor(Math.random()*10);
        if(!clear[select])
            return;
    }
}
// 새로운 문제로 넘어감
function new_q() {
    time_left = 60;     // 제한시간 초기화
    document.querySelector('#time').innerText = "Time: " + time_left + "s";
    document.querySelector('input').value = "";     // 입력창 비우기
    document.querySelector('#check').innerText = "Check Word";      // check word 버튼 초기화
    document.querySelector('h1').innerText = "Q " + clear_total;        // 문제 번호 띄우기
    select_q();    // 문제 고르기
    document.querySelector('h2').innerText = print_q();     // 문제 띄우기
    document.querySelector('#hint').innerText = quiz[select].hint;      // 힌트 띄우기
    answer = quiz[select].answer;       // 문제 정답 저장
    document.querySelector('#answer').focus();      // 입력창 포커스
    interval = setInterval(time_minus, 1000);       //제한 시간 시작
}
// 고른 문제 출력
function print_q() {
    let s = "";
    for(let i = 0; i < 8; i++)
        s += quiz[select].words[i] + " ";
    return s.trim();
}
// 입력값 체크
function check_word() {
    let s = document.querySelector('input').value;      // 입력한 정보 저장
    document.querySelector('input').value = "";
    if(s.toLowerCase() == answer) {     // 정답일 경우
        clearInterval(interval);        // 제한 시간 중지
        document.querySelector('#check').innerText = "Correct!";
        clear[select] = true;
        clear_total++;
        if(clear_total == 11) {       // 모든 문제 클리어 시
            clearInterval(total_interval);
            if(nickname == "")
                nickname = "noname";
            alert(nickname + " got every question right in " + time_total + " seconds!");
            location.href='good.html';
        }
        else
            setTimeout(new_q, 700);     // 다음 문제로 넘어가기
    }
    else {      // 오답일 경우
        document.querySelector('#check').innerText = "Wrong Answer!";       
        setTimeout( ()=> {document.querySelector('#check').innerText = "Check Word";}, 700);
    }
}
// 입력 후 엔터키 클릭 시 동작
function enterkey(event) {
    if(event.keyCode == 13)
        check_word();
}
// refresh 클릭 시 동작
function refresh() {
    clearInterval(interval);
    new_q();
}
// 제한 시간 감소
function time_minus() {
    if(time_left > 0) {
        time_left--;
        document.querySelector('#time').innerText = "Time: " + time_left + "s";
    } else {
        clearInterval(interval);
        clearInterval(total_interval);
        location.href='gameover.html';
        return;
    }
}
// 현재 문제에 따라 입력값 길이 제한
function maxlength(t) {
    if(t.value.length > answer.length) {
        t.value = t.value.slice(0, answer.length);
    }
}