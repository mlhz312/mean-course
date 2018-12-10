import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";

import { Post } from "../post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post!" },
  //   { title: "Second Post", content: "This is the first post!" },
  //   { title: "Third Post", content: "This is the first post!" }
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
