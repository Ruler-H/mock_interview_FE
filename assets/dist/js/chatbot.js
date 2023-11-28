const chatbotPage = `
<div class="d-flex w-100">
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary h-100" style="width: 235px; max-height: 660px; overflow: auto;">
        <button type="button" class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom chat-create">
            <svg class="bi pe-none me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
            <span class="fs-5 fw-semibold">채팅방 목록</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1  0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
        </button>
    <div class="chat-list">
    </div>
</div>
<div class="h-100 w-100 d-flex justify-content-center">
    <div class="w-100 d-flex flex-column" style="max-width: 766px;">
        <div class="content-container d-flex flex-row" style="height: 600px;">
            <div class="chat-id" style="display:none;"></div>
            <div class="col-md-6 w-100 mb-4 message-list" style="overflow: auto;">
            </div>
        </div>
        <div class="input-group">
            <input type="text" class="form-control q-inp" placeholder="질문을 입력하세요." aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary q-btn" type="button" id="button-addon2">질문</button>
        </div>
    </div>
</div>
`;

const $techChat = document.querySelector('.tech-chat');

function messageInputEvent(){
    const $messageList = document.querySelector('.message-list');
    const $qInp = document.querySelector(".q-inp");
    const userTag = `
    <span class="sc-knefzF PVUie" style="display:block; text-align:right;">User</span>
    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static" style="background-color:rgb(100, 70, 255); color: rgb(255, 255, 255);";>
            ${$qInp.value}
        </div>
    </div>`
    $messageList.innerHTML += userTag;
    const span = document.createElement('span');
    span.className = "sc-knefzF PVUie";
    span.textContent = "Tech Chatbot";
    $messageList.appendChild(span);
    const div = document.createElement('div');
    div.className = "row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative";
    const childDiv = document.createElement('div');
    childDiv.className = "col p-4 d-flex flex-column position-static";
    childDiv.style = "background-color:rgb(242, 247, 255)";
    div.appendChild(childDiv);
    $messageList.appendChild(div);
    const chatId = document.querySelector('.chat-id');
    console.log(chatId);
    const data = {
        "room_pk":chatId.textContent,
        "question":$qInp.value,
    }
    console.log(data);
    fetch(url + "chatbot/answer/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    }).then(res => res.json()
    ).then(data => {
        childDiv.textContent = data['answer'];
    })
}

function chatCreateEvent() {
    $.ajax({
        type: "GET",
        url: url + "account/status/",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        success: function(data){
            $.ajax({
                type: "POST",
                url: url + "chatbot/",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                },
                data: JSON.stringify({"client":data["pk"]}),
                success: function(res) {
                    chatbotPageLoad();
                },
                error: function(error) {
                    console.log(error);
                }
            })
        },
        error: function(error) {
            console.log(error);
        }
    });
    return false;
}

function chatDelete(){
    const $chatId = document.querySelector(".chat-id");
    $.ajax({
        type: "DELETE",
        url: url + "chatbot/" + $chatId.textContent + "/",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        success: function(res) {
            chatbotPageLoad();
        },
        error: function(error) {
            console.log(error);
        }
    })
}

function messageListLoad(messages, chat_pk) {
    const $messageList = document.querySelector('.message-list');
    let child = ''
    for(let i = 0; i < messages.length; i++){
        const message = messages[i];
        sender = message['sender']
        
        if(sender){
            child +=`
            <span class="sc-knefzF PVUie">Tech Chatbot</span>
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static" style="background-color:rgb(242, 247, 255)";>
                    ${message['content']}
                </div>
            </div>`
            
        }else{
            child +=`
            <span class="sc-knefzF PVUie" style="display:block; text-align:right;">User</span>
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static" style="background-color:rgb(100, 70, 255); color: rgb(255, 255, 255);";>
                    ${message['content']}
                </div>
            </div>`
        }
    }
    $messageList.innerHTML = child;
    const btn = document.createElement('button');
    btn.className = "btn btn-dark rounded-pill px-3"
    btn.type = "button"
    btn.textContent = "채팅방 삭제"
    btn.addEventListener("click", () => {
        chatDelete();
    })
    $messageList.insertBefore(btn, $messageList.firstChild);
}


function chatListLoad() {
    const $chatList = document.querySelector('.chat-list');
    fetch(url + 'chatbot/list/', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    }).then(res => res.json()
    ).then(datas => {
        for (let i = 0; i < datas.length; i++) {
            message = datas[i]["message"];
            if (message === "") {
                message = "이전 채팅 내용이 없습니다.";
            }
            const div = document.createElement('div');
            div.className = "list-group list-group-flush border-bottom scrollarea";
            const a = document.createElement('a');
            a.className = "list-group-item list-group-item-action py-3 lh-sm";
            a.textContent = message;
            div.appendChild(a);
            div.addEventListener('click', function (event) {
                const $chatId = document.querySelector(".chat-id");
                $chatId.textContent = datas[i]['id'];
                event.preventDefault();
                fetch(url + 'chatbot/' + datas[i]['id'] + '/messages/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }).then(res => res.json()
                ).then(messages => {
                    messageListLoad(messages, datas[i]['id']);
                })
            });
            $chatList.appendChild(div);
        }
    })
}

function chatbotPageLoad() {
    pageRender(chatbotPage);
    const $chatCreate = document.querySelector('.chat-create');
    $chatCreate.addEventListener('click', function (e) {
        e.preventDefault();
        chatCreateEvent();
    })
    chatListLoad();
    const $qBtn = document.querySelector('.q-btn');
    $qBtn.addEventListener('click', (e) => {
        e.preventDefault();
        messageInputEvent();
    })
    
}

$techChat.addEventListener('click', (e) => {
    $.ajax({
        type: "GET",
        url: url + "account/status/",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        success: function(data){
            chatbotPageLoad();
        },
        error: function(error) {
            loginPageLoad();
        }
    });
    return false;
});

