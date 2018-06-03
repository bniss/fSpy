import { CalibrationMode } from "../types/global-settings";
import { ControlPointPairIndex } from "../types/control-points-state";
import { PrincipalPointMode1VP, PrincipalPointMode2VP, HorizonMode, Axis, ReferenceDistanceUnit } from "../types/calibration-settings";
import CalibrationResult from "../types/calibration-result";
import Point2D from "../solver/point-2d";
import { StoreState } from "../types/store-state";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import Solver from "../solver/solver";

export enum ActionTypes {
  //Global settings actions
  SET_CALIBRATION_MODE = "SET_CALIBRATION_MODE",
  SET_IMAGE_OPACITY = "SET_IMAGE_OPACITY",
  SET_GRID_FLOOR_NORMAL = "SET_GRID_FLOOR_NORMAL",

  //Image loading actions
  SET_IMAGE_URL = "SET_IMAGE_URL",
  SET_IMAGE_SIZE = "SET_IMAGE_SIZE",

  //Calibration settings actions
  SET_HORIZON_MODE = "SET_HORIZON_MODE",
  SET_QUAD_MODE_ENABLED = "SET_QUAD_MODE_ENABLED",
  SET_REFERENCE_DISTANCE = "SET_REFERENCE_DISTANCE",
  SET_REFERENCE_DISTANCE_UNIT = "SET_REFERENCE_DISTANCE_UNIT",
  SET_REFERENCE_DISTANCE_AXIS = "SET_REFERENCE_DISTANCE_AXIS",
  SET_CAMERA_PRESET = "SET_CAMERA_PRESET",
  SET_CAMERA_SENSOR_SIZE = "SET_CAMERA_SENSOR_SIZE",

  SET_PRINCIPAL_POINT_MODE_1VP = "SET_PRINCIPAL_POINT_MODE_1VP",
  SET_PRINCIPAL_POINT_MODE_2VP = "SET_PRINCIPAL_POINT_MODE_2VP",
  SET_VANISHING_POINT_AXIS_1VP = "SET_VANISHING_POINT_AXIS_1VP",
  SET_VANISHING_POINT_AXIS_2VP = "SET_VANISHING_POINT_AXIS_2VP",

  SET_ABSOLUTE_FOCAL_LENGTH_1VP = "SET_RELATIVE_FOCAL_LENGTH_1VP",

  //Control point actions
  SET_PRINCIPAL_POINT = "SET_PRINCIPAL_POINT",
  SET_ORIGIN = "SET_ORIGIN",
  SET_REFERENCE_DISTANCE_ANCHOR = "SET_REFERENCE_DISTANCE_ANCHOR",
  ADJUST_HORIZON = "ADJUST_HORIZON",
  ADJUST_VANISHING_POINT = "ADJUST_VANISHING_POINT",
  ADJUST_REFERENCE_DISTANCE_HANDLE = "ADJUST_REFERENCE_DISTANCE_HANDLE",

  //
  SET_CALIBRATION_RESULT = "SET_CALIBRATION_RESULT",

  //
  SET_EXPORT_DIALOG_VISIBILITY = "SET_EXPORT_DIALOG_VISIBILITY"
}

export function recalculateCalibrationResult(): ThunkAction<void, StoreState, void, AppAction> {
  return (dispatch: ThunkDispatch<StoreState, void, AppAction>, getState: () => StoreState) => {
    let state = getState()

    let result: CalibrationResult = {
      calibrationResult1VP: Solver.solve1VP(
        state.calibrationSettings1VP,
        state.controlPointsState1VP,
        state.image
      ),
      calibrationResult2VP: Solver.solve2VP(
        state.calibrationSettings2VP,
        state.controlPointsState2VP,
        state.image
      )
    }

    dispatch(setCalibrationResult(result))
  }
}

//Set active calibration mode
export interface SetCalibrationMode {
  type: ActionTypes.SET_CALIBRATION_MODE
  calibrationMode: CalibrationMode
}

export function setCalibrationMode(calibrationMode: CalibrationMode): SetCalibrationMode {
  return {
    type: ActionTypes.SET_CALIBRATION_MODE,
    calibrationMode: calibrationMode
  }
}

//Set image opacity
export interface SetImageOpacity {
  type: ActionTypes.SET_IMAGE_OPACITY
  opacity: number
}

export function setImageOpacity(opacity: number): SetImageOpacity {
  return {
    type: ActionTypes.SET_IMAGE_OPACITY,
    opacity: opacity
  }
}

//Set grid floor normal
export interface SetGridFloorNormal {
  type: ActionTypes.SET_GRID_FLOOR_NORMAL
  axis: Axis | null
}

export function setGridFloorNormal(axis: Axis | null): SetGridFloorNormal {
  return {
    type: ActionTypes.SET_GRID_FLOOR_NORMAL,
    axis: axis
  }
}

//
export interface SetImageURL {
  type: ActionTypes.SET_IMAGE_URL
  url: string
}

export function setImageUrl(url: string): SetImageURL {
  return {
    type: ActionTypes.SET_IMAGE_URL,
    url: url
  }
}

//
export interface SetImageSize {
  type: ActionTypes.SET_IMAGE_SIZE
  width: number | null
  height: number | null
}

export function setImageSize(width: number | null, height: number | null): SetImageSize {
  return {
    type: ActionTypes.SET_IMAGE_SIZE,
    width: width,
    height: height
  }
}

//
export interface SetHorizonMode {
  type: ActionTypes.SET_HORIZON_MODE
  horizonMode: HorizonMode
}

export function setHorizonMode(horizonMode: HorizonMode): SetHorizonMode {
  return {
    type: ActionTypes.SET_HORIZON_MODE,
    horizonMode: horizonMode
  }
}

//
export interface SetQuadModeEnabled {
  type: ActionTypes.SET_QUAD_MODE_ENABLED
  quadModeEnabled: boolean
}

export function setQuadModeEnabled(quadModeEnabled: boolean): SetQuadModeEnabled {
  return {
    type: ActionTypes.SET_QUAD_MODE_ENABLED,
    quadModeEnabled: quadModeEnabled
  }
}

//
export interface SetPrincipalPointMode1VP {
  type: ActionTypes.SET_PRINCIPAL_POINT_MODE_1VP
  principalPointMode: PrincipalPointMode1VP
}

export function setPrincipalPointMode1VP(principalPointMode: PrincipalPointMode1VP): SetPrincipalPointMode1VP {
  return {
    type: ActionTypes.SET_PRINCIPAL_POINT_MODE_1VP,
    principalPointMode: principalPointMode
  }
}

//
export interface SetPrincipalPointMode2VP {
  type: ActionTypes.SET_PRINCIPAL_POINT_MODE_2VP
  principalPointMode: PrincipalPointMode2VP
}

export function setPrincipalPointMode2VP(principalPointMode: PrincipalPointMode2VP): SetPrincipalPointMode2VP {
  return {
    type: ActionTypes.SET_PRINCIPAL_POINT_MODE_2VP,
    principalPointMode: principalPointMode
  }
}

//
export interface SetVanishingPointAxis1VP {
  type: ActionTypes.SET_VANISHING_POINT_AXIS_1VP
  axis: Axis
}

export function setVanishingPointAxis1VP(axis: Axis): SetVanishingPointAxis1VP {
  return {
    type: ActionTypes.SET_VANISHING_POINT_AXIS_1VP,
    axis: axis
  }
}

//
export interface SetVanishingPointAxis2VP {
  type: ActionTypes.SET_VANISHING_POINT_AXIS_2VP,
  vanishingPointIndex: number,
  axis: Axis
}

export function setVanishingPointAxis2VP(vanishingPointIndex: number, axis: Axis): SetVanishingPointAxis2VP {
  return {
    type: ActionTypes.SET_VANISHING_POINT_AXIS_2VP,
    vanishingPointIndex: vanishingPointIndex,
    axis: axis
  }
}

//

export interface SetAbsoluteFocalLength1VP {
  type: ActionTypes.SET_ABSOLUTE_FOCAL_LENGTH_1VP,
  absoluteFocalLength: number
}

export function setAbsoluteFocalLength1VP(absoluteFocalLength: number): SetAbsoluteFocalLength1VP {
  return {
    type: ActionTypes.SET_ABSOLUTE_FOCAL_LENGTH_1VP,
    absoluteFocalLength: absoluteFocalLength
  }
}

//
export interface SetReferenceDistance {
  type: ActionTypes.SET_REFERENCE_DISTANCE,
  calibrationMode: CalibrationMode,
  distance: number
}

export function setReferenceDistance(calibrationMode: CalibrationMode, distance: number): SetReferenceDistance {
  return {
    type: ActionTypes.SET_REFERENCE_DISTANCE,
    calibrationMode: calibrationMode,
    distance: distance
  }
}

//
export interface SetReferenceDistanceUnit {
  type: ActionTypes.SET_REFERENCE_DISTANCE_UNIT,
  calibrationMode: CalibrationMode,
  unit: ReferenceDistanceUnit
}

export function setReferenceDistanceUnit(calibrationMode: CalibrationMode, unit: ReferenceDistanceUnit): SetReferenceDistanceUnit {
  return {
    type: ActionTypes.SET_REFERENCE_DISTANCE_UNIT,
    calibrationMode: calibrationMode,
    unit: unit
  }
}

//
export interface SetReferenceDistanceAxis {
  type: ActionTypes.SET_REFERENCE_DISTANCE_AXIS,
  calibrationMode: CalibrationMode,
  axis: Axis | null
}

export function setReferenceDistanceAxis(calibrationMode: CalibrationMode, axis: Axis | null): SetReferenceDistanceAxis {
  return {
    type: ActionTypes.SET_REFERENCE_DISTANCE_AXIS,
    calibrationMode: calibrationMode,
    axis: axis
  }
}

//
export interface SetCameraPreset {
  type: ActionTypes.SET_CAMERA_PRESET,
  calibrationMode: CalibrationMode,
  cameraPreset: string | null
}

export function setCameraPreset(calibrationMode: CalibrationMode, cameraPreset: string | null): SetCameraPreset {
  return {
    type: ActionTypes.SET_CAMERA_PRESET,
    calibrationMode: calibrationMode,
    cameraPreset: cameraPreset
  }
}

//
export interface SetCameraSensorSize {
  type: ActionTypes.SET_CAMERA_SENSOR_SIZE,
  calibrationMode: CalibrationMode,
  width: number | undefined
  height: number | undefined
}

export function setCameraSensorSize(calibrationMode: CalibrationMode, width: number | undefined, height: number | undefined): SetCameraSensorSize {
  return {
    type: ActionTypes.SET_CAMERA_SENSOR_SIZE,
    calibrationMode: calibrationMode,
    width: width,
    height: height
  }
}

//Set principal point
export interface SetPrincipalPoint {
  type: ActionTypes.SET_PRINCIPAL_POINT
  calibrationMode: CalibrationMode
  position: Point2D
}

export function setPrincipalPoint(calibrationMode: CalibrationMode, position: Point2D): SetPrincipalPoint {
  return {
    type: ActionTypes.SET_PRINCIPAL_POINT,
    position: position,
    calibrationMode: calibrationMode
  }
}

//Set origin
export interface SetOrigin {
  type: ActionTypes.SET_ORIGIN
  calibrationMode: CalibrationMode
  position: Point2D
}

export function setOrigin(calibrationMode: CalibrationMode, position: Point2D): SetOrigin {
  return {
    type: ActionTypes.SET_ORIGIN,
    position: position,
    calibrationMode: calibrationMode
  }
}

//Set reference distance anchor
export interface SetReferenceDistanceAnchor {
  type: ActionTypes.SET_REFERENCE_DISTANCE_ANCHOR
  calibrationMode: CalibrationMode
  position: Point2D
}

export function setReferenceDistanceAnchor(calibrationMode: CalibrationMode, position: Point2D): SetReferenceDistanceAnchor {
  return {
    type: ActionTypes.SET_REFERENCE_DISTANCE_ANCHOR,
    position: position,
    calibrationMode: calibrationMode
  }
}

//Adjust horizon (i.e set the position one endpoint of the horizon line)
export interface AdjustHorizon {
  type: ActionTypes.ADJUST_HORIZON,
  controlPointIndex: ControlPointPairIndex,
  position: Point2D
}

export function adjustHorizon(
  controlPointIndex: ControlPointPairIndex,
  position: Point2D
): AdjustHorizon {
  return {
    type: ActionTypes.ADJUST_HORIZON,
    controlPointIndex: controlPointIndex,
    position: position
  }
}

//Adjust a vanishing point (i.e set the position of an endpoint of a line
//segment of a vanishing point control)
export interface AdjustVanishingPoint {
  type: ActionTypes.ADJUST_VANISHING_POINT,
  calibrationMode: CalibrationMode,
  vanishingPointIndex: number,
  lineSegmentIndex: number,
  controlPointIndex: ControlPointPairIndex,
  position: Point2D
}

export function adjustVanishingPoint(
  calibrationMode: CalibrationMode,
  vanshingPointIndex: number,
  lineSegmentIndex: number,
  controlPointIndex: ControlPointPairIndex,
  position: Point2D
): AdjustVanishingPoint {
  return {
    type: ActionTypes.ADJUST_VANISHING_POINT,
    calibrationMode: calibrationMode,
    vanishingPointIndex: vanshingPointIndex,
    lineSegmentIndex: lineSegmentIndex,
    controlPointIndex: controlPointIndex,
    position: position
  }
}

//

export interface AdjustReferenceDistanceHandle {
  type: ActionTypes.ADJUST_REFERENCE_DISTANCE_HANDLE,
  calibrationMode: CalibrationMode,
  handleIndex: number,
  position: number
}

export function adjustReferenceDistanceHandle(
  calibrationMode: CalibrationMode,
  handleIndex: number,
  position: number
): AdjustReferenceDistanceHandle {
  return {
    type: ActionTypes.ADJUST_REFERENCE_DISTANCE_HANDLE,
    calibrationMode: calibrationMode,
    handleIndex: handleIndex,
    position: position
  }
}

//Set calibration result
export interface SetCalibrationResult {
  type: ActionTypes.SET_CALIBRATION_RESULT,
  result: CalibrationResult
}

export function setCalibrationResult(result: CalibrationResult): SetCalibrationResult {
  return {
    type: ActionTypes.SET_CALIBRATION_RESULT,
    result: result
  }
}

//
export interface SetExportDialogVisibility {
  type: ActionTypes.SET_EXPORT_DIALOG_VISIBILITY,
  isVisible: boolean
}

export function setExportDialogVisibility(isVisible: boolean): SetExportDialogVisibility {
  return {
    type: ActionTypes.SET_EXPORT_DIALOG_VISIBILITY,
    isVisible: isVisible
  }
}

//Define a type covering all actions
export type AppAction =
  SetCalibrationMode |
  SetImageOpacity |
  SetGridFloorNormal |
  SetImageURL |
  SetImageSize |
  SetHorizonMode |
  SetQuadModeEnabled |
  SetPrincipalPointMode1VP |
  SetPrincipalPointMode2VP |
  SetVanishingPointAxis1VP |
  SetVanishingPointAxis2VP |
  SetAbsoluteFocalLength1VP |
  SetReferenceDistanceAxis |
  SetReferenceDistanceUnit |
  SetCameraPreset |
  SetCameraSensorSize |
  SetReferenceDistance |
  SetOrigin |
  SetReferenceDistanceAnchor |
  SetPrincipalPoint |
  AdjustHorizon |
  AdjustReferenceDistanceHandle |
  AdjustVanishingPoint |
  SetCalibrationResult |
  SetExportDialogVisibility

//A list of action types that trigger calibration result calculation
export const actionTypesTriggeringRecalculation: ActionTypes[] = [
  ActionTypes.SET_IMAGE_SIZE,

  ActionTypes.SET_HORIZON_MODE,
  ActionTypes.SET_QUAD_MODE_ENABLED,
  ActionTypes.SET_REFERENCE_DISTANCE,
  ActionTypes.SET_REFERENCE_DISTANCE_UNIT,
  ActionTypes.SET_REFERENCE_DISTANCE_AXIS,
  ActionTypes.SET_CAMERA_PRESET,
  ActionTypes.SET_CAMERA_SENSOR_SIZE,

  ActionTypes.SET_PRINCIPAL_POINT_MODE_1VP,
  ActionTypes.SET_PRINCIPAL_POINT_MODE_2VP,
  ActionTypes.SET_VANISHING_POINT_AXIS_1VP,
  ActionTypes.SET_VANISHING_POINT_AXIS_2VP,

  ActionTypes.SET_ABSOLUTE_FOCAL_LENGTH_1VP,
  ActionTypes.SET_PRINCIPAL_POINT,
  ActionTypes.SET_ORIGIN,
  ActionTypes.SET_REFERENCE_DISTANCE_ANCHOR,
  ActionTypes.ADJUST_HORIZON,
  ActionTypes.ADJUST_VANISHING_POINT,
  ActionTypes.ADJUST_REFERENCE_DISTANCE_HANDLE,
]