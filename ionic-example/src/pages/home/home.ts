import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { getRepository, Repository } from 'typeorm';

import { Author } from '../../entities/author';
import { Category } from '../../entities/category';
import { Post } from '../../entities/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private savedPost: boolean = false;
  private loadedPost: Post = null;

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.runDemo();
  }

  ionViewWillLeave() {

  }

  async runDemo() {
    const category1 = new Category();
    category1.name = "TypeScript";

    const category2 = new Category();
    category2.name = "Programming";

    const author = new Author();
    author.name = "Person";

    const post = new Post();
    post.title = "Control flow based type analysis";
    post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
    post.categories = [category1, category2];
    post.author = author;

    const postRepository = getRepository('post') as Repository<Post>;
    await postRepository.save(post);

    console.log("Post has been saved");
    this.savedPost = true;

    const loadedPost = await postRepository.createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .innerJoinAndSelect('post.categories', 'categories')
      .where('post.id = :id', {id: post.id})
      .getOne();

    console.log("Post has been loaded: ", loadedPost);
    this.loadedPost = loadedPost;

    // WS

    var ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function () {
        console.log('open');
        alert("open socket")
        this.send('hello');         // transmit "hello" after connecting        
    };

    ws.onmessage = function (event) {
        console.log(event.data);    // will be "hello"
        this.close();
    };

    ws.onerror = function (event) {
        alert(JSON.stringify(event))
        console.log('error occurred!');
    };

    ws.onclose = function (event) {
        //alert('close code=' + event.code) // 1006
        console.log('close code=' + event.code);
    };

    

  }

  getCategories() {
    if(this.loadedPost) {
      return this.loadedPost.categories.map(cat => cat.name).join(", ");
    }

    return '';
  }

}

/*

Wrapper Example

var app = angular.module('<your_app>', [
    'ionic',
    ...,
    'ngWebSocket']); //injection
app.factory('$appWs', ['$log', '$websocket', function($log, $websocket) {
    // private
    var closedByUser = false;
    var listeners = {};
    var opened = false;
    var ws;
    function startListeners() {
        ws.onClose(function() {
            opened = false;
            if(!closedByUser) {
                appWs.init();
            }
        });
        ws.onError(function(err) {
            $log.error(angular.toJson(err));
            ws.close();
        });
        ws.onMessage(function(message) {
            var msg = angular.fromJson(message.data); // JSON is returned from WS Server in the format {code:'string', data:{}}
            appWs.pingListener(msg.code, msg.data); // To activate the necessary handler for the message
        });
        ws.onOpen(function() {
            opened = true;
            if(listeners['webSocketOpened']) {
                appWs.removeListener('webSocketOpened'); // To notify my app when my WS is opened
            }
        });
    };
    //public
    var appWs = {};
    appWs.addListener = function(code, deferred) {
        listeners[code] = deferred;
    };
    appWs.close = function() {
        closedByUser = true;
        ws.close();
    };
    appWs.init = function() {
        ws = $websocket('ws://localhost:8080');
        startListeners();
    };
    appWs.isOpen = function() {
        return opened;
    };
    appWs.pingListener = function(code, msg) {
        if(listeners[code]) {
            listeners[code].notify(msg);
        }
    };
    appWs.removeListener = function(code) {
        listeners[code].resolve('Listener ' + code + ' terminated successfully');
        delete listeners[code];
    };
    appWs.send = ws.send;
    return appWs;
}]);
app.controller('AppCtrl', function ContentController($scope, $ionicPlatform, $q, $appWs) {
    function handleNewMessages() {
         var q = $q.defer();
         q.promise.then(function(result) {
              // Executes on ws.removeListener()
         }, function(error) {
              // Executes when rejection of promise;
         }, function(message) {
              // Executes on pingListener()
              // This is where we put logic to add messages to our view
         });
         $appWs.addListener('newMessage', q);
    }
    var deferred = $q.defer();
    deferred.promise.then(function() {
        handleNewMessages();
    });
    $appWs.addListener('webSocketOpened', deferred);
    $ionicPlatform.ready(function() {
        $appWs.init();
    });
});

*/