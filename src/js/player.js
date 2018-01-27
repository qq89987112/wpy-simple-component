const
    backgroundAudioManager = wx.getBackgroundAudioManager&&wx.getBackgroundAudioManager(),
    app = getApp();
let intervalPlayTick;

function getTimeLenStr(timeLen) {
    var str = '';
    if (timeLen == null) {
        str = '';
    }
    else {
        var hour = parseInt(timeLen / (60 * 60));
        timeLen = timeLen - hour * (60 * 60);

        var minute = parseInt(timeLen / (60));
        timeLen = timeLen - minute * (60);

        var second = parseInt(timeLen);

        if (hour > 0) {
            if (hour > 9) {
                str = hour + ":";
            }
            else {
                str = "0" + hour + ":";
            }
        }

        if (minute > 9) {
            str = str + minute + ":";
        }
        else {
            str = str + '0' + minute + ":";
        }

        if (second > 9) {
            str = str + second;
        }
        else {
            str = str + '0' + second;
        }
    }

    return str;
}

const tick = {
    /**
     * 清除时间滴答钟
     */
    clearTick: function () {
        if (intervalPlayTick) {
            clearInterval(intervalPlayTick);
            intervalPlayTick = null;
        }
    },
    /**
     * 开启时间滴答钟
     */
    beginTick: function (cb) {
        tick.clearTick();
        intervalPlayTick = setInterval(() => cb, 40);
    },
}

export {
    tick
};

let
    callbacks = {},
    isPlaying = false;


export default {
    toggle(){
        this.isPlaying()?this.pause():this.play();
    },
    isPlaying(){
        // 自己维护一个，应用程序第一次播放音频时，在sccuess中的调用结果是错误的，其他情况是正确的。
        // const isPause = backgroundAudioManager.paused===true || backgroundAudioManager.paused === undefined;
        return isPlaying;
    },
    seek(position,cb){

        if(position>backgroundAudioManager.duration || position>backgroundAudioManager.buffered){
            cb("未加载到该位置！");
            return;
        }
        if (!this.isPlaying()) {
            //方便暂停时的seek
            this._seek = position;
        }
        if(backgroundAudioManager){
            backgroundAudioManager.seek(position);
        }else{
            wx.seekBackgroundAudio({
                position
            });
        }
        return this;
    },
    play(title,dataUrl,coverImgUrl,cb){
        isPlaying = true;
        if(dataUrl){
            wx.playBackgroundAudio({
                    dataUrl,
                    coverImgUrl,
                    title,
                    success:cb
                }
            );
        }else if(backgroundAudioManager){
            backgroundAudioManager.play();
        }
        this._seek&&this.seek(this._seek);
        this._seek = undefined;
        backgroundAudioManager.onError(()=>{
            const onStop = callbacks.onStop || (()=>{})
            onStop();
        })
        return this
    },
    pause(){
        isPlaying = false;
        if(backgroundAudioManager){
            backgroundAudioManager.pause();
        }else{
            wx.pauseBackgroundAudio();
        }
        return this;
    },
    stop(){
        isPlaying = false;
        app.playingStory = undefined;
        if(backgroundAudioManager){
            backgroundAudioManager.stop();
        }else{
            wx.stopBackgroundAudio();
        }
    },
    onError(cb){
        const onError = ()=>{
            isPlaying = false;
            cb();
        }
        if(backgroundAudioManager){
            backgroundAudioManager.onError(onError);
        }
    },
    onTimeUpdate(cb){
        callbacks['timeUpdate'] = cb;
        if(backgroundAudioManager){
            backgroundAudioManager.onTimeUpdate(()=>{
                let time = Math.floor(backgroundAudioManager.currentTime);
                cb&&cb({
                    time: time,
                    timeStr:getTimeLenStr(time)
                })
            });
        }else{
            tick.beginTick(cb);
        }
        return this;
    },
    onPlay(cb){
        const onPlay = ()=>{
            isPlaying = true;
            cb();
        }
        if(backgroundAudioManager){
            backgroundAudioManager.onPlay(onPlay);
        }else{
            wx.onBackgroundAudioPlay(onPlay);
        }
        return this;
    },
    onStop(cb){
        const onStop = ()=>{
            isPlaying = false;
            cb();
        }
        callbacks.onStop = onStop;
        if(backgroundAudioManager){
            backgroundAudioManager.onStop(onStop);
        }else{
            wx.onBackgroundAudioStop(onStop);
        }
        return this;
    },
    onPause(cb){
        const onPause = ()=>{
            isPlaying = false;
            cb();
        }
        if(backgroundAudioManager){
            backgroundAudioManager.onPause(onPause);
        }else{
            wx.onBackgroundAudioPause(onPause);
        }
        return this;
    },
    onEnded(cb){
        const onEnded = ()=>{
            isPlaying = false;
            cb();
        }
        if(backgroundAudioManager){
            backgroundAudioManager.onEnded(onEnded);
        }
        return this
    }
}