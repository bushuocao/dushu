class Tab {
    constructor(id){
        console.log(this);
        this.main = document.querySelector(id);
        this.ul = document.querySelector('ul');
        this.tabscon = document.querySelector('.tabscon');
        this.add = document.querySelector('.tabadd');
        this.init();
    };

    init(){
        this.uplist();
        this.add.onclick = this.addTab.bind(this.add,this);
        for(var i = 0;i<this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.tabTab.bind(this.lis[i],this);
            this.removes[i].onclick = this.removeTab.bind(this.removes[i],this);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    //重新获取新增
    uplist(){
        this.lis = document.querySelectorAll('li');
        this.sections = document.querySelectorAll('section');
        this.removes = document.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    
    //切换
    tabTab(chat){
        chat.clearClass();
        this.className = 'liactive';
        chat.sections[this.index].className = 'conactive';
    }
    //清除
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //新增
    addTab(chat){
        chat.uplist();
        chat.clearClass();
        var random = Math.random();
        //创建元素
        var str = '<li class="liactive"><span>新增选项</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试' + random + '</section>'
        chat.ul.insertAdjacentHTML('beforeend',str);
        chat.tabscon.insertAdjacentHTML('beforeend',section);
        chat.init();
    }
    //3.删除功能
    removeTab(that, e) {
        e.stopPropagation(); //阻止冒泡 防止触发li的切换事件
        
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        console.log(document.querySelector('.liactive'));
        //当我们删除的不是选中状态的li的时候，原来的选中状态li保持不变
        if(document.querySelector('.liactive'))return;
        index--;
        that.lis[index] && that.lis[index].click();
    }
    
    //编辑
    editTab(){
        var str = this.innerHTML;
        //禁止双击复制文字
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //alert(123);
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select();//文本框里面的文字处于选定状态
        //当我们离开文本框就把文本框里面的值给span
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        }
        //按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                //手动调用，失去焦点事件
                this.blur();
            }
        }
    }
    
}

new Tab('#tab');