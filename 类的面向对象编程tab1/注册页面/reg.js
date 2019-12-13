window.onload = function(){
    var regte1 = /^1[3-9]\d{9}$/;
    var regpaw = /^\w{6,12}$/;
    var te1 = document.querySelector('#te1');
    var paw = document.querySelector('#paw');
    var qrpaw = document.querySelector('#qrpaw');
    regexp(te1,regte1);
    regexp(paw,regpaw);
    function regexp(ele, reg){
        ele.onblur = function(){
            if(reg.test(this.value)){
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜你输入正确';
            }else{
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确';
            }
        }
    }


    qrpaw.onblur = function(){
        if(paw.value == this.value){
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>两次密码输入一致';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次密码输入不一样';
        }
    }

}