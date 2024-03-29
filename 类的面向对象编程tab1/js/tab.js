// var that;
class Tab {
    constructor(id) {
        console.log(this);
        // that = this;
        //获取元素
        this.main = document.querySelector(id);
        console.log()
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        this.updateNode();
        //init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab.bind(this.add,this);
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i],this);
            this.remove[i].onclick = this.removeTab.bind(this.remove[i],this);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    //因为新增按钮需要动态添加
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    //1.切换功能
    toggleTab(that) {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    //清除
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //2.添加功能
    addTab(that) {
        that.clearClass();
        var random = Math.random();
        //1.创建一个li与纳素
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试' + random + '</section>'

        //2.把这两个元素追加到对应到父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    //3.删除功能
    removeTab(that, e) {
        e.stopPropagation(); //阻止冒泡 防止触发li的切换事件
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //当我们删除的不是选中状态的li的时候，原来的选中状态li保持不变
        if(document.querySelector('.liactive'))return;
        index--;
        that.lis[index] && that.lis[index].click();
    }

    //4.修改功能
    editTab() {
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

///parentNode