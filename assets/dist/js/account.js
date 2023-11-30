const loginPage = `
    <form>
        <h1 class="h3 mb-3 fw-normal">Mock Interview에 로그인하기</h1>
        <p class="mb-3">아직 계정이 없으시면 <a class="signup-btn"><mark>여기</mark></a>를 클릭하세요</p>
        <div class="alert alert-danger err-msg" role="alert" style="display:none">
        </div>
        <div class="form-floating">
            <input type="email" class="form-control email-inp mb-3" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
        <input type="password" class="form-control password-inp mb-3" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
        </div>
        <button class="btn btn-primary w-100 py-2 login-btn" type="button">Sign in</button>
    </form>`;

const signupPage = `
    <form>
        <h1 class="h3 mb-3 fw-normal">Mock Interview에 가입하기</h1>
        <p class="mb-3">이미 계정이 있으면 <a class="login-btn"><mark>여기</mark></a>를 클릭하세요</p>
        <div class="alert alert-danger err-msg" role="alert" style="display:none"></div>
        <div class="form-floating mb-3">
            <input type="email" class="form-control email-inp" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control username-inp" id="floatingInput" placeholder="Username">
            <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control pass-inp" id="floatingPassword password1" placeholder="Password">
            <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control pass2-inp" id="floatingPassword password2" placeholder="Password config">
            <label for="floatingPassword">Password config</label>
        </div>
        <button class="btn btn-primary w-100 py-2 signup-submit-btn" type="button">Sign up</button>
    </form>`;
    
const profilePage = (username, email) => `
    <div>
        <h1 class="h3 mb-3 fw-normal">Profile</h1>
        <div class="alert alert-danger err-msg" role="alert" style="display:none"></div>
        <div class="form-floating mb-3">
            <input type="email" value=${email} class="form-control email-inp" id="floatingInput" placeholder="name@example.com" readonly>
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control username-inp" id="floatingInput" placeholder="Username" value=${username} readonly>
            <label for="floatingInput">Username</label>
        </div>
        <button class="btn btn-primary w-100 py-2 profile-update-btn mb-3" type="button">프로필 수정</button>
        <button class="btn btn-primary w-100 py-2 logout-btn mb-3" type="button">로그아웃</button>
        <button class="btn btn-primary w-100 py-2 account-delete-btn mb-3" type="button">계정 삭제</button>
    </div>`;

const profileEditPage = (username, email) => `
    <div>
        <h1 class="h3 mb-3 fw-normal">Profile 수정하기</h1>
        <div class="alert alert-danger err-msg" role="alert" style="display:none"></div>
        <div class="form-floating mb-3">
            <input type="email" value=${email} class="form-control email-inp" id="floatingInput" placeholder="name@example.com" readonly>
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control username-inp" id="floatingInput" placeholder="Username" value=${username}>
            <label for="floatingInput">Username</label>
        </div>
        <button class="btn btn-primary w-100 py-2 update-submit-btn mb-3" type="button">수정 완료</button>
    </div>`;

const $navLogin = document.querySelector('.nav-account');

function authreload(){
    fetch(url + 'account/status/', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    }).then(async(res) => {
        const data = await res.json();
        if (res.ok) {
            $navLogin.innerHTML =
            `
                <a class="nav-link link-body-emphasis px-2 nav-menu nav-profile-link href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                </a>
            `;
            const $navProfileLink = document.querySelector('.nav-profile-link');
            $navProfileLink.addEventListener('click', () => {
                profilePageLoad(data);
            })
        }else{
            $navLogin.innerHTML =
            `
                <a class="nav-link link-body-emphasis px-2 nav-menu nav-login-link href="#">Login</a>
            `;
            const $navLoginLink = document.querySelector('.nav-login-link');
            $navLoginLink.addEventListener('click', () => {
                loginPageLoad();
            });
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}
authreload();

function profileUpdatePageLoad(username, email, pk){
    pageRender(profileEditPage(username, email));
    const $editEmail = document.querySelector(".email-inp");
    const $editUsername = document.querySelector(".username-inp");
    const $updateSubmitBtn = document.querySelector(".update-submit-btn");
    $updateSubmitBtn.addEventListener('click', () => {
        const data = {
            'email': $editEmail.value,
            'username': $editUsername.value,
        }
        fetch(url + 'account/user/' + pk + '/',  {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        }).then(res => {
            if(res.ok){
                authreload();
                firstPageRender();
                location.reload(true);
            }else{
                const errMsg = document.querySelector('.err-msg');
                errMsg.setAttribute('style', '');
                errMsg.textContent = JSON.stringify(data);
            }
        })
    })
    
}

function profilePageLoad(data){
    const email = data['email'];
    const username = data['username'];
    const pk = data['pk'];
    pageRender(profilePage(username, email));
    const $profileUpdateBtn = document.querySelector(".profile-update-btn");
    const $logoutBtn = document.querySelector(".logout-btn");
    const $accountDeleteBtn = document.querySelector(".account-delete-btn");

    $profileUpdateBtn.addEventListener('click', () => {
        profileUpdatePageLoad(username, email, pk);
    })

    $logoutBtn.addEventListener('click', () => {
        const data = {
            "refresh": refreshToken,
        }
        fetch(url + 'account/logout/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.status === 205) {
                localStorage.clear();
                firstPageRender();
                location.reload(true);
            }else{
                const errMsg = document.querySelector('.err-msg');
                console.log(res.json());
            }
        })
    })

    $accountDeleteBtn.addEventListener('click', () => {
        fetch(url + 'account/user/' + pk + '/', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
        }).then(res => {
            if (res.status === 204) {
                localStorage.clear();
                firstPageRender();
                location.reload(true);
            }else{
                const errMsg = document.querySelector('.err-msg');
                console.log(res.json());
            }
        })
    })
}

function signupPageLoad(){
    pageRender(signupPage);
    const $signupSubmitBtn = document.querySelector(".signup-submit-btn");
    const $emailInp = document.querySelector(".email-inp");
    const $usernameInp = document.querySelector(".username-inp");
    const $passInp = document.querySelector(".pass-inp");
    const $pass2Inp = document.querySelector(".pass2-inp");
    
    $signupSubmitBtn.addEventListener('click', () => {
        const data = {
            "email":$emailInp.value,
            "username":$usernameInp.value,
            "password":$passInp.value,
            "password2":$pass2Inp.value,
        }
        fetch(url + 'account/signup/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(async res => {
            const data = await res.json()
            if (res.ok) {
                loginPageLoad();
            } else if (res.status === 400){
                const errMsg = document.querySelector('.err-msg');
                errMsg.setAttribute('style', '');
                errMsg.textContent = JSON.stringify(data);
            }
        }

        )
    })
}

function loginPageLoad() {
    pageRender(loginPage);
    const $loginBtn = document.querySelector('.login-btn');
    const $emailInp = document.querySelector('.email-inp');
    const $passwordInp = document.querySelector('.password-inp');
    const $signupBtn = document.querySelector('.signup-btn');
    $loginBtn.addEventListener('click', () => {
        const data = {
            "email": $emailInp.value,
            "password": $passwordInp.value,
        };
        fetch(url + 'account/login/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            const data = await res.json()
            if (res.ok) {
                localStorage.setItem('refreshToken', data['refresh']);
                localStorage.setItem('accessToken', data['access']);
                firstPageRender();
                location.reload(true);
            } else if (res.status === 400) {
                const errMsg = document.querySelector('.err-msg');
                errMsg.setAttribute('style', '');
                errMsg.textContent = JSON.stringify(data);
            }
        }).catch((err) => {
            console.log(err);
        })
    })

    $signupBtn.addEventListener('click', () => {
        signupPageLoad();
    })
};