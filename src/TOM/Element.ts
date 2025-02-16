import { Node } from "./Node.ts";

export abstract class Element extends Node{
  children: Element[] = []
}