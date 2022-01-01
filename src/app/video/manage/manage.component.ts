import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IClip } from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  videoOrder = '2';
  clips: IClip[] = [];
  activeClip: IClip | null = null;
  sort$: BehaviorSubject<string>;

  constructor(
    private clipService: ClipService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : 1;
      this.sort$.next(this.videoOrder);
    });
    this.clipService.getUserClips(this.sort$).subscribe((docs) => {
      this.clips = [];
      docs.forEach((doc) => {
        this.clips.push({ docID: doc.id, ...doc.data() });
      });
    });
  }

  sort($event: Event) {
    const { value } = $event.target as HTMLSelectElement;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: value },
    });
  }

  openModel($event: Event, clip: IClip) {
    $event.preventDefault();
    this.activeClip = clip;
    this.modal.toggleModal('edit-clip');
  }
  update($event: IClip) {
    this.clips.forEach((clip, index) => {
      if (clip.docID == $event.docID) {
        this.clips[index].title = $event.title;
      }
    });
  }

  delete($event: Event, clip: IClip) {
    $event.preventDefault();
    this.clipService.deleteClip(clip);
    this.clips.forEach((element, index) => {
      if (element.docID == clip.docID) {
        this.clips.splice(index, 1);
      }
    });
  }

  async copyClipboard($event: Event, docId: string | undefined) {
    $event.preventDefault();
    if (!docId) return;
    const url = `${location.origin}/clip/${docId}`;
    await navigator.clipboard.writeText(url);
    alert('Copied to clipboard');
  }
}
