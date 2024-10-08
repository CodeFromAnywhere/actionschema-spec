/**
 * Enumerates possible statuses for actions or processes. Specific enumeration values need to be defined.
 */
export type ActionSchemaStatus = "queued" | "waiting" | "busy" | "done";

/**
 * Defines metadata about every actionschema collection
 */
export interface SchemaList {
  /**
   * URI identifying the schema for JSON data validation.
   */
  $schema: string;
  /**
   * An array of items.
   */
  items: SchemaListItem[];
  variables?: StringObject;
  destinations?: StringObject1;
  /**
   * Privacy configurations for actions.
   */
  privacy?: "public" | "unlisted" | "private";
  /**
   * Category of the action, can be filled by user.
   */
  category?: string;
  /**
   * Status indicating whether rows are being generated.
   */
  rowGenerationStatus?: "queued" | "waiting" | "busy" | "done";
  status?: JsonArrayStatus;
  /**
   * Timestamp of the last operation.
   */
  lastOperationAt?: number;
  /**
   * Timestamp of the last size calculation.
   */
  lastSizeCalculatedAt?: number;
  /**
   * Size of the project in bytes.
   */
  projectSizeBytes?: number;
  /**
   * Delta changes for status updates, avoids refetches by transforming cell values.
   */
  delta?: JsonStatusDelta[];
  /**
   * Track spending by column.
   */
  columnSpending?: {
    [k: string]: GridSpending;
  };
  /**
   * Total spending for the grid.
   */
  totalSpending?: number;
  /**
   * Is deemed favorite.
   */
  isPinned?: boolean;
  /**
   * Indicates if the table is a root schema.
   */
  isRootSchema?: boolean;
  /**
   * Timestamp of creation.
   */
  createdAt?: number;
  /**
   * Timestamp of the last update.
   */
  updatedAt?: number | null;
  /**
   * Relative path of the project.
   */
  projectRelativePath?: string;
  /**
   * Description of the schema.
   */
  schemaDescription?: string | null;
  /**
   * Amount of plugins.
   */
  pluginsAmount?: number;
  /**
   * Amount of items.
   */
  itemsAmount?: number;
  [k: string]: unknown;
}
export interface SchemaListItem {
  [k: string]: unknown;
}
/**
 * Key-value pairs for variables.
 */
export interface StringObject {
  [k: string]: string;
}
/**
 * Key-value pairs for destinations.
 */
export interface StringObject1 {
  [k: string]: string;
}
/**
 * State concerning the status of (re)calculation behavior.
 */
export interface JsonArrayStatus {
  [k: string]: {
    [k: string]: ActionSchemaStatus | null;
  };
}
/**
 * Describes changes to be applied to a status, including the new status and value.
 */
export interface JsonStatusDelta {
  /**
   * Identifier for the row, if applicable.
   */
  rowId?: string | null;
  /**
   * Key of the property being updated.
   */
  propertyKey?: string | null;
  /**
   * Indicates if the newValue contains an array of items, prioritizing source plugin updates.
   */
  isSourcePluginUpdate?: boolean;
  /**
   * Enumerates possible statuses for actions or processes. Specific enumeration values need to be defined.
   */
  newStatus: "queued" | "waiting" | "busy" | "done";
  /**
   * The new value after the update, could be of any type.
   */
  newValue?: {
    [k: string]: unknown;
  };
}
/**
 * Defines the structure for tracking spending on grid columns, including pricing and calculations.
 */
export interface GridSpending {
  /**
   * The price in credits.
   */
  priceCredit?: number;
  /**
   * The amount of calculations.
   */
  calculationsAmount?: number;
  /**
   * The price in credits since the last edit.
   */
  priceCreditSinceLastEdit?: number;
  /**
   * The amount of calculations since the last edit.
   */
  calculationsAmountSinceLastEdit?: number;
}
