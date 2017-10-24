const net = require('net')
const probe=function(port, callback) {
    
      var server = net.createServer().listen(port)
    
      var calledOnce = false
    
      var timeoutRef = setTimeout(function () {
        calledOnce = true
        callback(false,port)
      }, 2000)
    
      timeoutRef.unref()
    
      var connected = false
    
      server.on('listening', function() {
        clearTimeout(timeoutRef)
    
        if (server)
          server.close()
    
        if (!calledOnce) {
          calledOnce = true
          callback(true,port)
        }
      })
    
      server.on('error', function(err) {
        clearTimeout(timeoutRef)
    
        var result = true
        if (err.code === 'EADDRINUSE')
          result = false
    
        if (!calledOnce) {
          calledOnce = true
          callback(result,port)
        }
      })
    }
    
    function server(_port){
      var pt = _port || __port;
      probe(pt,function(bl,_pt){
        // 端口被占用 bl 返回false
        // _pt：传入的端口号
        if(bl === true){
          // ssr(_pt)
          server = http.createServer(connListener);
          server = server.listen(parseInt(_pt, 10));
          console.log("\n Static file server running at" + "\n\n=> http://localhost:" + _pt + '\n');
        }else{
          server(_pt+1)
        }
      })
    }


    // var net = require('net')
    
    // // 检测端口是否被占用
    // function portIsOccupied (port) {
    //   // 创建服务并监听该端口
    //   var server = net.createServer().listen(port)
    
    //   server.on('listening', function () { // 执行这块代码说明端口未被占用
    //     server.close() // 关闭服务
    //     console.log('The port【' + port + '】 is available.') // 控制台输出信息
    //   })
    
    //   server.on('error', function (err) {
    //     if (err.code === 'EADDRINUSE') { // 端口已经被使用
    //       console.log('The port【' + port + '】 is occupied, please change other port.')
    //     }
    //   })
    // }
    

module.exports=probe;