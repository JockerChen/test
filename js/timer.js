function timerTask(cnt,timer,arrayEvent) {
  clearTimeout(timer);
  timer= setTimeout(function() {
      var eventFiler=arrayEvent.filter(function(item){
          return cnt%item.eventTimer==0;
      })
      // eventFiler.eventName
      for (var value of eventFiler){
          if(window[value.eventName] == undefined)continue;
          window[value.eventName]();
      }
      eventFiler=null;
      //计数器10万次归零
      if(cnt>=100000){
          cnt=0;
          return false;
      }
      console.log('cnt:'+cnt);
      cnt++;
      timerTask(cnt,timer,arrayEvent);

  },1000);
}
