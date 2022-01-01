import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClip } from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  @Output() update = new EventEmitter();
  showAlert = false;
  alertMsg = 'Please wait updating clips';
  alertColor = 'blue';
  inSubmission = false;
  clipId = new FormControl('');
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);

  editForm = new FormGroup({
    title: this.title,
    id: this.clipId,
  });

  constructor(
    private modalService: ModalService,
    private clipService: ClipService
  ) {}

  ngOnInit(): void {
    this.modalService.register('edit-clip');
  }
  ngOnDestroy(): void {
    this.modalService.unregister('edit-clip');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) return;
    this.clipId.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }

  async submit() {
    if (!this.activeClip) return;
    this.inSubmission = false;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait updating clips';

    try {
      await this.clipService.updateClip(this.clipId.value, this.title.value);
      this.alertColor = 'green';
      this.alertMsg = 'Update clip success';

      this.update.emit(this.activeClip);
    } catch (e) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong try again!';
      console.log(e);
      return;
    }
  }
}
