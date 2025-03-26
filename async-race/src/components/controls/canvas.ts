import { StorageService } from '../../services/local-storage.service';
import { Constants } from '../../shared/constants';
import { Utils } from '../../shared/utils/utils';

export class TimedRotatingCircle {
  public ctx: CanvasRenderingContext2D | null;

  public readonly centerX = +Constants.SIZE / 2;

  public readonly centerY = +Constants.SIZE / 2;

  public readonly radius = Constants.RADIUS;

  public angle: number = 0;

  public angularVelocity: number = 0.02;

  public startTime: number = 0;

  public isAnimating: boolean = false;

  public animationId: number | undefined = undefined;

  constructor(
    public canvas: HTMLCanvasElement,
    public duration: number = Constants.DEFAULT_DURATION,
    public sectors: Array<number> = []
  ) {
    this.ctx = canvas.getContext('2d');
    this.handleResize();
  }

  public static easeInOutQuad(t: number): number {
    return t < 0.5
      ? Constants.SPEED_FACTOR * t * t
      : -Constants.SPEED_COEFFICIENCY_SQ * t * t + Constants.SPEED_COEFFICIENCY * t - 1;
  }

  public handleResize = (): void => {
    if (!this.isAnimating) this.draw();
  };

  public draw(): void {
    StorageService.getData();
    const optionList = StorageService.data.list;
    const sumWeight = optionList
      .map(element => element.weight)
      .reduce((accumulator, current) => Number(accumulator) + Number(current), 0);

    if (this.ctx) {
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.translate(this.centerX, this.centerY);
      this.ctx.rotate(this.angle);

      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#003434a3';
      this.ctx.fill();
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(0, 0, Constants.SMALL_RADIUS, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#fff';
      this.ctx.fill();
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      let currentAngle = 0;
      for (let index = 0; index < optionList.length; index += 1) {
        const angleStep = (Math.PI * 2) / sumWeight;

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(Math.cos(currentAngle) * this.radius, Math.sin(currentAngle) * this.radius);

        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        const radiusOffset = this.radius * 0.6;
        const midAngle = currentAngle + (angleStep * Number(optionList[index].weight)) / 2;
        this.ctx.save();
        this.ctx.font = '8px Arial';
        this.ctx.translate(-optionList[index].title.length, -optionList[index].title.length / 2);
        this.ctx.rotate((5 * Math.PI) / 180);
        this.ctx.fillText(
          optionList[index].title,
          Math.cos(midAngle) * radiusOffset,
          Math.sin(midAngle) * radiusOffset
        );
        this.ctx.restore();
        currentAngle += angleStep * Number(optionList[index].weight);
      }

      this.ctx.restore();
    }
  }

  public update(angle: number): void {
    const angleDelta = Math.PI * 2 * angle;
    this.angle += angleDelta;
    if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2;
  }

  public startAnimation(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.startTime = performance.now();

    const animate = (timestamp: number): void => {
      const elapsed = timestamp - this.startTime;

      const progress = Math.min(elapsed / this.duration, 1);
      const easedProgress = TimedRotatingCircle.easeInOutQuad(progress);

      if (progress < 1) {
        this.update(easedProgress);
        this.draw();
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.stopAnimation();

        Utils.setDisabled(false);

        const isValueChecked = localStorage.getItem('isValueCheck');

        if (isValueChecked && JSON.parse(isValueChecked) === true) {
          const music = new Audio('./audio/win.wav');
          music.play().catch(error => {
            throw new Error(error);
          });
        }
      }
    };

    Utils.setDisabled(true);

    this.animationId = requestAnimationFrame(animate);
  }

  public stopAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
    this.isAnimating = false;
  }
}
