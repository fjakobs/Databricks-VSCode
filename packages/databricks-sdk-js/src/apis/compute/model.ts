/* eslint-disable @typescript-eslint/naming-convention */

// Code generated from OpenAPI specs by Databricks SDK Generator. DO NOT EDIT.

// all definitions in this file are in alphabetical order
export interface AddInstanceProfile {
    /**
     * The AWS IAM role ARN of the role associated with the instance profile.
     * This field is required if your role name and instance profile name do not
     * match and you want to use the instance profile with [Databricks SQL
     * Serverless].
     *
     * Otherwise, this field is optional.
     *
     * [Databricks SQL Serverless]: https://docs.databricks.com/sql/admin/serverless.html
     */
    iam_role_arn?: string;
    /**
     * The AWS ARN of the instance profile to register with Databricks. This
     * field is required.
     */
    instance_profile_arn: string;
    /**
     * Boolean flag indicating whether the instance profile should only be used
     * in credential passthrough scenarios. If true, it means the instance
     * profile contains an meta IAM role which could assume a wide range of
     * roles. Therefore it should always be used with authorization. This field
     * is optional, the default value is `false`.
     */
    is_meta_instance_profile?: boolean;
    /**
     * By default, Databricks validates that it has sufficient permissions to
     * launch instances with the instance profile. This validation uses AWS
     * dry-run mode for the RunInstances API. If validation fails with an error
     * message that does not indicate an IAM related permission issue, (e.g.
     * “Your requested instance type is not supported in your requested
     * availability zone”), you can pass this flag to skip the validation and
     * forcibly add the instance profile.
     */
    skip_validation?: boolean;
}

export interface AutoScale {
    /**
     * The maximum number of workers to which the cluster can scale up when
     * overloaded. Note that `max_workers` must be strictly greater than
     * `min_workers`.
     */
    max_workers: number;
    /**
     * The minimum number of workers to which the cluster can scale down when
     * underutilized. It is also the initial number of workers the cluster will
     * have after creation.
     */
    min_workers: number;
}

export interface AwsAttributes {
    /**
     * Availability type used for all subsequent nodes past the `first_on_demand`
     * ones.
     *
     * Note: If `first_on_demand` is zero, this availability type will be used
     * for the entire cluster.
     */
    availability?: AwsAvailability;
    /**
     * The number of volumes launched for each instance. Users can choose up to
     * 10 volumes. This feature is only enabled for supported node types. Legacy
     * node types cannot specify custom EBS volumes. For node types with no
     * instance store, at least one EBS volume needs to be specified; otherwise,
     * cluster creation will fail.
     *
     * These EBS volumes will be mounted at `/ebs0`, `/ebs1`, and etc. Instance
     * store volumes will be mounted at `/local_disk0`, `/local_disk1`, and etc.
     *
     * If EBS volumes are attached, Databricks will configure Spark to use only
     * the EBS volumes for scratch storage because heterogenously sized scratch
     * devices can lead to inefficient disk utilization. If no EBS volumes are
     * attached, Databricks will configure Spark to use instance store volumes.
     *
     * Please note that if EBS volumes are specified, then the Spark
     * configuration `spark.local.dir` will be overridden.
     */
    ebs_volume_count?: number;
    /**
     * <needs content added>
     */
    ebs_volume_iops?: number;
    /**
     * The size of each EBS volume (in GiB) launched for each instance. For
     * general purpose SSD, this value must be within the range 100 - 4096. For
     * throughput optimized HDD, this value must be within the range 500 - 4096.
     */
    ebs_volume_size?: number;
    /**
     * <needs content added>
     */
    ebs_volume_throughput?: number;
    /**
     * The type of EBS volumes that will be launched with this cluster.
     */
    ebs_volume_type?: EbsVolumeType;
    /**
     * The first `first_on_demand` nodes of the cluster will be placed on
     * on-demand instances. If this value is greater than 0, the cluster driver
     * node in particular will be placed on an on-demand instance. If this value
     * is greater than or equal to the current cluster size, all nodes will be
     * placed on on-demand instances. If this value is less than the current
     * cluster size, `first_on_demand` nodes will be placed on on-demand
     * instances and the remainder will be placed on `availability` instances.
     * Note that this value does not affect cluster size and cannot currently be
     * mutated over the lifetime of a cluster.
     */
    first_on_demand?: number;
    /**
     * Nodes for this cluster will only be placed on AWS instances with this
     * instance profile. If ommitted, nodes will be placed on instances without
     * an IAM instance profile. The instance profile must have previously been
     * added to the Databricks environment by an account administrator.
     *
     * This feature may only be available to certain customer plans.
     *
     * If this field is ommitted, we will pull in the default from the conf if it
     * exists.
     */
    instance_profile_arn?: string;
    /**
     * The bid price for AWS spot instances, as a percentage of the corresponding
     * instance type's on-demand price. For example, if this field is set to 50,
     * and the cluster needs a new `r3.xlarge` spot instance, then the bid price
     * is half of the price of on-demand `r3.xlarge` instances. Similarly, if
     * this field is set to 200, the bid price is twice the price of on-demand
     * `r3.xlarge` instances. If not specified, the default value is 100. When
     * spot instances are requested for this cluster, only spot instances whose
     * bid price percentage matches this field will be considered. Note that, for
     * safety, we enforce this field to be no more than 10000.
     *
     * The default value and documentation here should be kept consistent with
     * CommonConf.defaultSpotBidPricePercent and
     * CommonConf.maxSpotBidPricePercent.
     */
    spot_bid_price_percent?: number;
    /**
     * Identifier for the availability zone/datacenter in which the cluster
     * resides. This string will be of a form like "us-west-2a". The provided
     * availability zone must be in the same region as the Databricks deployment.
     * For example, "us-west-2a" is not a valid zone id if the Databricks
     * deployment resides in the "us-east-1" region. This is an optional field at
     * cluster creation, and if not specified, a default zone will be used. If
     * the zone specified is "auto", will try to place cluster in a zone with
     * high availability, and will retry placement in a different AZ if there is
     * not enough capacity. See [[AutoAZHelper.scala]] for more details. The list
     * of available zones as well as the default value can be found by using the
     * `List Zones`_ method.
     */
    zone_id?: string;
}

/**
 * Availability type used for all subsequent nodes past the `first_on_demand`
 * ones.
 *
 * Note: If `first_on_demand` is zero, this availability type will be used for
 * the entire cluster.
 */
export type AwsAvailability = "ON_DEMAND" | "SPOT" | "SPOT_WITH_FALLBACK";

export interface AzureAttributes {
    /**
     * Availability type used for all subsequent nodes past the `first_on_demand`
     * ones. Note: If `first_on_demand` is zero (which only happens on pool
     * clusters), this availability type will be used for the entire cluster.
     */
    availability?: AzureAvailability;
    /**
     * The first `first_on_demand` nodes of the cluster will be placed on
     * on-demand instances. This value should be greater than 0, to make sure the
     * cluster driver node is placed on an on-demand instance. If this value is
     * greater than or equal to the current cluster size, all nodes will be
     * placed on on-demand instances. If this value is less than the current
     * cluster size, `first_on_demand` nodes will be placed on on-demand
     * instances and the remainder will be placed on `availability` instances.
     * Note that this value does not affect cluster size and cannot currently be
     * mutated over the lifetime of a cluster.
     */
    first_on_demand?: number;
    /**
     * Defines values necessary to configure and run Azure Log Analytics agent
     */
    log_analytics_info?: LogAnalyticsInfo;
    /**
     * The max bid price to be used for Azure spot instances. The Max price for
     * the bid cannot be higher than the on-demand price of the instance. If not
     * specified, the default value is -1, which specifies that the instance
     * cannot be evicted on the basis of price, and only on the basis of
     * availability. Further, the value should > 0 or -1.
     */
    spot_bid_max_price?: number;
}

/**
 * Availability type used for all subsequent nodes past the `first_on_demand`
 * ones. Note: If `first_on_demand` is zero (which only happens on pool
 * clusters), this availability type will be used for the entire cluster.
 */
export type AzureAvailability =
    | "ON_DEMAND_AZURE"
    | "SPOT_AZURE"
    | "SPOT_WITH_FALLBACK_AZURE";

export interface CancelCommand {
    clusterId?: string;
    commandId?: string;
    contextId?: string;
}

export interface ChangeClusterOwner {
    /**
     * <needs content added>
     */
    cluster_id: string;
    /**
     * New owner of the cluster_id after this RPC.
     */
    owner_username: string;
}

export interface ClientsTypes {
    /**
     * With jobs set, the cluster can be used for jobs
     */
    jobs?: boolean;
    /**
     * With notebooks set, this cluster can be used for notebooks
     */
    notebooks?: boolean;
}

export interface CloudProviderNodeInfo {
    status?: Array<CloudProviderNodeStatus>;
}

export type CloudProviderNodeStatus =
    | "NotAvailableInRegion"
    | "NotEnabledOnSubscription";

export interface ClusterAttributes {
    /**
     * Automatically terminates the cluster after it is inactive for this time in
     * minutes. If not set, this cluster will not be automatically terminated. If
     * specified, the threshold must be between 10 and 10000 minutes. Users can
     * also set this value to 0 to explicitly disable automatic termination.
     */
    autotermination_minutes?: number;
    /**
     * Attributes related to clusters running on Amazon Web Services. If not
     * specified at cluster creation, a set of default values will be used.
     */
    aws_attributes?: AwsAttributes;
    /**
     * Attributes related to clusters running on Microsoft Azure. If not
     * specified at cluster creation, a set of default values will be used.
     */
    azure_attributes?: AzureAttributes;
    /**
     * The configuration for delivering spark logs to a long-term storage
     * destination. Two kinds of destinations (dbfs and s3) are supported. Only
     * one destination can be specified for one cluster. If the conf is given,
     * the logs will be delivered to the destination every `5 mins`. The
     * destination of driver logs is `$destination/$clusterId/driver`, while the
     * destination of executor logs is `$destination/$clusterId/executor`.
     */
    cluster_log_conf?: ClusterLogConf;
    /**
     * Cluster name requested by the user. This doesn't have to be unique. If not
     * specified at creation, the cluster name will be an empty string.
     */
    cluster_name?: string;
    /**
     * Determines whether the cluster was created by a user through the UI,
     * created by the Databricks Jobs Scheduler, or through an API request. This
     * is the same as cluster_creator, but read only.
     */
    cluster_source?: ClusterSource;
    /**
     * Additional tags for cluster resources. Databricks will tag all cluster
     * resources (e.g., AWS instances and EBS volumes) with these tags in
     * addition to `default_tags`. Notes:
     *
     * - Currently, Databricks allows at most 45 custom tags
     *
     * - Clusters can only reuse cloud resources if the resources' tags are a
     * subset of the cluster tags
     */
    custom_tags?: Record<string, string>;
    /**
     * This describes an enum
     */
    data_security_mode?: DataSecurityMode;
    docker_image?: DockerImage;
    /**
     * The optional ID of the instance pool for the driver of the cluster
     * belongs. The pool cluster uses the instance pool with id
     * (instance_pool_id) if the driver pool is not assigned.
     */
    driver_instance_pool_id?: string;
    /**
     * The node type of the Spark driver. Note that this field is optional; if
     * unset, the driver node type will be set as the same value as
     * `node_type_id` defined above.
     */
    driver_node_type_id?: string;
    /**
     * Autoscaling Local Storage: when enabled, this cluster will dynamically
     * acquire additional disk space when its Spark workers are running low on
     * disk space. This feature requires specific AWS permissions to function
     * correctly - refer to the User Guide for more details.
     */
    enable_elastic_disk?: boolean;
    /**
     * Whether to enable LUKS on cluster VMs' local disks
     */
    enable_local_disk_encryption?: boolean;
    /**
     * Attributes related to clusters running on Google Cloud Platform. If not
     * specified at cluster creation, a set of default values will be used.
     */
    gcp_attributes?: GcpAttributes;
    /**
     * The configuration for storing init scripts. Any number of destinations can
     * be specified. The scripts are executed sequentially in the order provided.
     * If `cluster_log_conf` is specified, init script logs are sent to
     * `<destination>/<cluster-ID>/init_scripts`.
     */
    init_scripts?: Array<InitScriptInfo>;
    /**
     * The optional ID of the instance pool to which the cluster belongs.
     */
    instance_pool_id?: string;
    /**
     * This field encodes, through a single value, the resources available to
     * each of the Spark nodes in this cluster. For example, the Spark nodes can
     * be provisioned and optimized for memory or compute intensive workloads. A
     * list of available node types can be retrieved by using the
     * :method:clusters/listNodeTypes API call.
     */
    node_type_id?: string;
    /**
     * The ID of the cluster policy used to create the cluster if applicable.
     */
    policy_id?: string;
    /**
     * Decides which runtime engine to be use, e.g. Standard vs. Photon. If
     * unspecified, the runtime engine is inferred from spark_version.
     */
    runtime_engine?: RuntimeEngine;
    /**
     * Single user name if data_security_mode is `SINGLE_USER`
     */
    single_user_name?: string;
    /**
     * An object containing a set of optional, user-specified Spark configuration
     * key-value pairs. Users can also pass in a string of extra JVM options to
     * the driver and the executors via `spark.driver.extraJavaOptions` and
     * `spark.executor.extraJavaOptions` respectively.
     */
    spark_conf?: Record<string, string>;
    /**
     * An object containing a set of optional, user-specified environment
     * variable key-value pairs. Please note that key-value pair of the form
     * (X,Y) will be exported as is (i.e., `export X='Y'`) while launching the
     * driver and workers.
     *
     * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we
     * recommend appending them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the
     * example below. This ensures that all default databricks managed
     * environmental variables are included as well.
     *
     * Example Spark environment variables: `{"SPARK_WORKER_MEMORY": "28000m",
     * "SPARK_LOCAL_DIRS": "/local_disk0"}` or `{"SPARK_DAEMON_JAVA_OPTS":
     * "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
     */
    spark_env_vars?: Record<string, string>;
    /**
     * The Spark version of the cluster, e.g. `3.3.x-scala2.11`. A list of
     * available Spark versions can be retrieved by using the
     * :method:clusters/sparkVersions API call.
     */
    spark_version: string;
    /**
     * SSH public key contents that will be added to each Spark node in this
     * cluster. The corresponding private keys can be used to login with the user
     * name `ubuntu` on port `2200`. Up to 10 keys can be specified.
     */
    ssh_public_keys?: Array<string>;
    workload_type?: WorkloadType;
}

export interface ClusterDetails {
    /**
     * Parameters needed in order to automatically scale clusters up and down
     * based on load. Note: autoscaling works best with DB runtime versions 3.0
     * or later.
     */
    autoscale?: AutoScale;
    /**
     * Automatically terminates the cluster after it is inactive for this time in
     * minutes. If not set, this cluster will not be automatically terminated. If
     * specified, the threshold must be between 10 and 10000 minutes. Users can
     * also set this value to 0 to explicitly disable automatic termination.
     */
    autotermination_minutes?: number;
    /**
     * Attributes related to clusters running on Amazon Web Services. If not
     * specified at cluster creation, a set of default values will be used.
     */
    aws_attributes?: AwsAttributes;
    /**
     * Attributes related to clusters running on Microsoft Azure. If not
     * specified at cluster creation, a set of default values will be used.
     */
    azure_attributes?: AzureAttributes;
    /**
     * Number of CPU cores available for this cluster. Note that this can be
     * fractional, e.g. 7.5 cores, since certain node types are configured to
     * share cores between Spark nodes on the same instance.
     */
    cluster_cores?: number;
    /**
     * Canonical identifier for the cluster. This id is retained during cluster
     * restarts and resizes, while each new cluster has a globally unique id.
     */
    cluster_id?: string;
    /**
     * The configuration for delivering spark logs to a long-term storage
     * destination. Two kinds of destinations (dbfs and s3) are supported. Only
     * one destination can be specified for one cluster. If the conf is given,
     * the logs will be delivered to the destination every `5 mins`. The
     * destination of driver logs is `$destination/$clusterId/driver`, while the
     * destination of executor logs is `$destination/$clusterId/executor`.
     */
    cluster_log_conf?: ClusterLogConf;
    /**
     * Cluster log delivery status.
     */
    cluster_log_status?: LogSyncStatus;
    /**
     * Total amount of cluster memory, in megabytes
     */
    cluster_memory_mb?: number;
    /**
     * Cluster name requested by the user. This doesn't have to be unique. If not
     * specified at creation, the cluster name will be an empty string.
     */
    cluster_name?: string;
    /**
     * Determines whether the cluster was created by a user through the UI,
     * created by the Databricks Jobs Scheduler, or through an API request. This
     * is the same as cluster_creator, but read only.
     */
    cluster_source?: ClusterSource;
    /**
     * Creator user name. The field won't be included in the response if the user
     * has already been deleted.
     */
    creator_user_name?: string;
    /**
     * Additional tags for cluster resources. Databricks will tag all cluster
     * resources (e.g., AWS instances and EBS volumes) with these tags in
     * addition to `default_tags`. Notes:
     *
     * - Currently, Databricks allows at most 45 custom tags
     *
     * - Clusters can only reuse cloud resources if the resources' tags are a
     * subset of the cluster tags
     */
    custom_tags?: Record<string, string>;
    /**
     * This describes an enum
     */
    data_security_mode?: DataSecurityMode;
    /**
     * Tags that are added by Databricks regardless of any `custom_tags`,
     * including:
     *
     * - Vendor: Databricks
     *
     * - Creator: <username_of_creator>
     *
     * - ClusterName: <name_of_cluster>
     *
     * - ClusterId: <id_of_cluster>
     *
     * - Name: <Databricks internal use>
     */
    default_tags?: Record<string, string>;
    docker_image?: DockerImage;
    /**
     * Node on which the Spark driver resides. The driver node contains the Spark
     * master and the <Databricks> application that manages the per-notebook
     * Spark REPLs.
     */
    driver?: SparkNode;
    /**
     * The optional ID of the instance pool for the driver of the cluster
     * belongs. The pool cluster uses the instance pool with id
     * (instance_pool_id) if the driver pool is not assigned.
     */
    driver_instance_pool_id?: string;
    /**
     * The node type of the Spark driver. Note that this field is optional; if
     * unset, the driver node type will be set as the same value as
     * `node_type_id` defined above.
     */
    driver_node_type_id?: string;
    /**
     * Autoscaling Local Storage: when enabled, this cluster will dynamically
     * acquire additional disk space when its Spark workers are running low on
     * disk space. This feature requires specific AWS permissions to function
     * correctly - refer to the User Guide for more details.
     */
    enable_elastic_disk?: boolean;
    /**
     * Whether to enable LUKS on cluster VMs' local disks
     */
    enable_local_disk_encryption?: boolean;
    /**
     * Nodes on which the Spark executors reside.
     */
    executors?: Array<SparkNode>;
    /**
     * Attributes related to clusters running on Google Cloud Platform. If not
     * specified at cluster creation, a set of default values will be used.
     */
    gcp_attributes?: GcpAttributes;
    /**
     * The configuration for storing init scripts. Any number of destinations can
     * be specified. The scripts are executed sequentially in the order provided.
     * If `cluster_log_conf` is specified, init script logs are sent to
     * `<destination>/<cluster-ID>/init_scripts`.
     */
    init_scripts?: Array<InitScriptInfo>;
    /**
     * The optional ID of the instance pool to which the cluster belongs.
     */
    instance_pool_id?: string;
    /**
     * Port on which Spark JDBC server is listening, in the driver nod. No
     * service will be listeningon on this port in executor nodes.
     */
    jdbc_port?: number;
    /**
     * the timestamp that the cluster was started/restarted
     */
    last_restarted_time?: number;
    /**
     * Time when the cluster driver last lost its state (due to a restart or
     * driver failure).
     */
    last_state_loss_time?: number;
    /**
     * This field encodes, through a single value, the resources available to
     * each of the Spark nodes in this cluster. For example, the Spark nodes can
     * be provisioned and optimized for memory or compute intensive workloads. A
     * list of available node types can be retrieved by using the
     * :method:clusters/listNodeTypes API call.
     */
    node_type_id?: string;
    /**
     * Number of worker nodes that this cluster should have. A cluster has one
     * Spark Driver and `num_workers` Executors for a total of `num_workers` + 1
     * Spark nodes.
     *
     * Note: When reading the properties of a cluster, this field reflects the
     * desired number of workers rather than the actual current number of
     * workers. For instance, if a cluster is resized from 5 to 10 workers, this
     * field will immediately be updated to reflect the target size of 10
     * workers, whereas the workers listed in `spark_info` will gradually
     * increase from 5 to 10 as the new nodes are provisioned.
     */
    num_workers?: number;
    /**
     * The ID of the cluster policy used to create the cluster if applicable.
     */
    policy_id?: string;
    /**
     * Decides which runtime engine to be use, e.g. Standard vs. Photon. If
     * unspecified, the runtime engine is inferred from spark_version.
     */
    runtime_engine?: RuntimeEngine;
    /**
     * Single user name if data_security_mode is `SINGLE_USER`
     */
    single_user_name?: string;
    /**
     * An object containing a set of optional, user-specified Spark configuration
     * key-value pairs. Users can also pass in a string of extra JVM options to
     * the driver and the executors via `spark.driver.extraJavaOptions` and
     * `spark.executor.extraJavaOptions` respectively.
     */
    spark_conf?: Record<string, string>;
    /**
     * A canonical SparkContext identifier. This value *does* change when the
     * Spark driver restarts. The pair `(cluster_id, spark_context_id)` is a
     * globally unique identifier over all Spark contexts.
     */
    spark_context_id?: number;
    /**
     * An object containing a set of optional, user-specified environment
     * variable key-value pairs. Please note that key-value pair of the form
     * (X,Y) will be exported as is (i.e., `export X='Y'`) while launching the
     * driver and workers.
     *
     * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we
     * recommend appending them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the
     * example below. This ensures that all default databricks managed
     * environmental variables are included as well.
     *
     * Example Spark environment variables: `{"SPARK_WORKER_MEMORY": "28000m",
     * "SPARK_LOCAL_DIRS": "/local_disk0"}` or `{"SPARK_DAEMON_JAVA_OPTS":
     * "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
     */
    spark_env_vars?: Record<string, string>;
    /**
     * The Spark version of the cluster, e.g. `3.3.x-scala2.11`. A list of
     * available Spark versions can be retrieved by using the
     * :method:clusters/sparkVersions API call.
     */
    spark_version?: string;
    /**
     * SSH public key contents that will be added to each Spark node in this
     * cluster. The corresponding private keys can be used to login with the user
     * name `ubuntu` on port `2200`. Up to 10 keys can be specified.
     */
    ssh_public_keys?: Array<string>;
    /**
     * Time (in epoch milliseconds) when the cluster creation request was
     * received (when the cluster entered a `PENDING` state).
     */
    start_time?: number;
    /**
     * Current state of the cluster.
     */
    state?: State;
    /**
     * A message associated with the most recent state transition (e.g., the
     * reason why the cluster entered a `TERMINATED` state).
     */
    state_message?: string;
    /**
     * Time (in epoch milliseconds) when the cluster was terminated, if
     * applicable.
     */
    terminated_time?: number;
    /**
     * Information about why the cluster was terminated. This field only appears
     * when the cluster is in a `TERMINATING` or `TERMINATED` state.
     */
    termination_reason?: TerminationReason;
    workload_type?: WorkloadType;
}

export interface ClusterEvent {
    /**
     * <needs content added>
     */
    cluster_id: string;
    /**
     * <needs content added>
     */
    data_plane_event_details?: DataPlaneEventDetails;
    /**
     * <needs content added>
     */
    details?: EventDetails;
    /**
     * The timestamp when the event occurred, stored as the number of
     * milliseconds since the Unix epoch. If not provided, this will be assigned
     * by the Timeline service.
     */
    timestamp?: number;
    type?: EventType;
}

export interface ClusterLibraryStatuses {
    /**
     * Unique identifier for the cluster.
     */
    cluster_id?: string;
    /**
     * Status of all libraries on the cluster.
     */
    library_statuses?: Array<LibraryFullStatus>;
}

export interface ClusterLogConf {
    /**
     * destination needs to be provided. e.g. `{ "dbfs" : { "destination" :
     * "dbfs:/home/cluster_log" } }`
     */
    dbfs?: DbfsStorageInfo;
    /**
     * destination and either the region or endpoint need to be provided. e.g. `{
     * "s3": { "destination" : "s3://cluster_log_bucket/prefix", "region" :
     * "us-west-2" } }` Cluster iam role is used to access s3, please make sure
     * the cluster iam role in `instance_profile_arn` has permission to write
     * data to the s3 destination.
     */
    s3?: S3StorageInfo;
}

export interface ClusterSize {
    /**
     * Parameters needed in order to automatically scale clusters up and down
     * based on load. Note: autoscaling works best with DB runtime versions 3.0
     * or later.
     */
    autoscale?: AutoScale;
    /**
     * Number of worker nodes that this cluster should have. A cluster has one
     * Spark Driver and `num_workers` Executors for a total of `num_workers` + 1
     * Spark nodes.
     *
     * Note: When reading the properties of a cluster, this field reflects the
     * desired number of workers rather than the actual current number of
     * workers. For instance, if a cluster is resized from 5 to 10 workers, this
     * field will immediately be updated to reflect the target size of 10
     * workers, whereas the workers listed in `spark_info` will gradually
     * increase from 5 to 10 as the new nodes are provisioned.
     */
    num_workers?: number;
}

/**
 * Determines whether the cluster was created by a user through the UI, created
 * by the Databricks Jobs Scheduler, or through an API request. This is the same
 * as cluster_creator, but read only.
 */
export type ClusterSource =
    | "API"
    | "JOB"
    | "MODELS"
    | "PIPELINE"
    | "PIPELINE_MAINTENANCE"
    | "SQL"
    | "UI";

export interface ClusterSpec {
    /**
     * Parameters needed in order to automatically scale clusters up and down
     * based on load. Note: autoscaling works best with DB runtime versions 3.0
     * or later.
     */
    autoscale?: AutoScale;
    /**
     * Automatically terminates the cluster after it is inactive for this time in
     * minutes. If not set, this cluster will not be automatically terminated. If
     * specified, the threshold must be between 10 and 10000 minutes. Users can
     * also set this value to 0 to explicitly disable automatic termination.
     */
    autotermination_minutes?: number;
    /**
     * Attributes related to clusters running on Amazon Web Services. If not
     * specified at cluster creation, a set of default values will be used.
     */
    aws_attributes?: AwsAttributes;
    /**
     * Attributes related to clusters running on Microsoft Azure. If not
     * specified at cluster creation, a set of default values will be used.
     */
    azure_attributes?: AzureAttributes;
    /**
     * The configuration for delivering spark logs to a long-term storage
     * destination. Two kinds of destinations (dbfs and s3) are supported. Only
     * one destination can be specified for one cluster. If the conf is given,
     * the logs will be delivered to the destination every `5 mins`. The
     * destination of driver logs is `$destination/$clusterId/driver`, while the
     * destination of executor logs is `$destination/$clusterId/executor`.
     */
    cluster_log_conf?: ClusterLogConf;
    /**
     * Cluster name requested by the user. This doesn't have to be unique. If not
     * specified at creation, the cluster name will be an empty string.
     */
    cluster_name?: string;
    /**
     * Determines whether the cluster was created by a user through the UI,
     * created by the Databricks Jobs Scheduler, or through an API request. This
     * is the same as cluster_creator, but read only.
     */
    cluster_source?: ClusterSource;
    /**
     * Additional tags for cluster resources. Databricks will tag all cluster
     * resources (e.g., AWS instances and EBS volumes) with these tags in
     * addition to `default_tags`. Notes:
     *
     * - Currently, Databricks allows at most 45 custom tags
     *
     * - Clusters can only reuse cloud resources if the resources' tags are a
     * subset of the cluster tags
     */
    custom_tags?: Record<string, string>;
    /**
     * This describes an enum
     */
    data_security_mode?: DataSecurityMode;
    docker_image?: DockerImage;
    /**
     * The optional ID of the instance pool for the driver of the cluster
     * belongs. The pool cluster uses the instance pool with id
     * (instance_pool_id) if the driver pool is not assigned.
     */
    driver_instance_pool_id?: string;
    /**
     * The node type of the Spark driver. Note that this field is optional; if
     * unset, the driver node type will be set as the same value as
     * `node_type_id` defined above.
     */
    driver_node_type_id?: string;
    /**
     * Autoscaling Local Storage: when enabled, this cluster will dynamically
     * acquire additional disk space when its Spark workers are running low on
     * disk space. This feature requires specific AWS permissions to function
     * correctly - refer to the User Guide for more details.
     */
    enable_elastic_disk?: boolean;
    /**
     * Whether to enable LUKS on cluster VMs' local disks
     */
    enable_local_disk_encryption?: boolean;
    /**
     * Attributes related to clusters running on Google Cloud Platform. If not
     * specified at cluster creation, a set of default values will be used.
     */
    gcp_attributes?: GcpAttributes;
    /**
     * The configuration for storing init scripts. Any number of destinations can
     * be specified. The scripts are executed sequentially in the order provided.
     * If `cluster_log_conf` is specified, init script logs are sent to
     * `<destination>/<cluster-ID>/init_scripts`.
     */
    init_scripts?: Array<InitScriptInfo>;
    /**
     * The optional ID of the instance pool to which the cluster belongs.
     */
    instance_pool_id?: string;
    /**
     * This field encodes, through a single value, the resources available to
     * each of the Spark nodes in this cluster. For example, the Spark nodes can
     * be provisioned and optimized for memory or compute intensive workloads. A
     * list of available node types can be retrieved by using the
     * :method:clusters/listNodeTypes API call.
     */
    node_type_id?: string;
    /**
     * Number of worker nodes that this cluster should have. A cluster has one
     * Spark Driver and `num_workers` Executors for a total of `num_workers` + 1
     * Spark nodes.
     *
     * Note: When reading the properties of a cluster, this field reflects the
     * desired number of workers rather than the actual current number of
     * workers. For instance, if a cluster is resized from 5 to 10 workers, this
     * field will immediately be updated to reflect the target size of 10
     * workers, whereas the workers listed in `spark_info` will gradually
     * increase from 5 to 10 as the new nodes are provisioned.
     */
    num_workers?: number;
    /**
     * The ID of the cluster policy used to create the cluster if applicable.
     */
    policy_id?: string;
    /**
     * Decides which runtime engine to be use, e.g. Standard vs. Photon. If
     * unspecified, the runtime engine is inferred from spark_version.
     */
    runtime_engine?: RuntimeEngine;
    /**
     * Single user name if data_security_mode is `SINGLE_USER`
     */
    single_user_name?: string;
    /**
     * An object containing a set of optional, user-specified Spark configuration
     * key-value pairs. Users can also pass in a string of extra JVM options to
     * the driver and the executors via `spark.driver.extraJavaOptions` and
     * `spark.executor.extraJavaOptions` respectively.
     */
    spark_conf?: Record<string, string>;
    /**
     * An object containing a set of optional, user-specified environment
     * variable key-value pairs. Please note that key-value pair of the form
     * (X,Y) will be exported as is (i.e., `export X='Y'`) while launching the
     * driver and workers.
     *
     * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we
     * recommend appending them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the
     * example below. This ensures that all default databricks managed
     * environmental variables are included as well.
     *
     * Example Spark environment variables: `{"SPARK_WORKER_MEMORY": "28000m",
     * "SPARK_LOCAL_DIRS": "/local_disk0"}` or `{"SPARK_DAEMON_JAVA_OPTS":
     * "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
     */
    spark_env_vars?: Record<string, string>;
    /**
     * The Spark version of the cluster, e.g. `3.3.x-scala2.11`. A list of
     * available Spark versions can be retrieved by using the
     * :method:clusters/sparkVersions API call.
     */
    spark_version?: string;
    /**
     * SSH public key contents that will be added to each Spark node in this
     * cluster. The corresponding private keys can be used to login with the user
     * name `ubuntu` on port `2200`. Up to 10 keys can be specified.
     */
    ssh_public_keys?: Array<string>;
    workload_type?: WorkloadType;
}

/**
 * Get status
 */
export interface ClusterStatusRequest {
    /**
     * Unique identifier of the cluster whose status should be retrieved.
     */
    cluster_id: string;
}

export interface Command {
    /**
     * Running cluster id
     */
    clusterId?: string;
    /**
     * Executable code
     */
    command?: string;
    /**
     * Running context id
     */
    contextId?: string;
    language?: Language;
}

export type CommandStatus =
    | "Cancelled"
    | "Cancelling"
    | "Error"
    | "Finished"
    | "Queued"
    | "Running";

/**
 * Get command info
 */
export interface CommandStatusRequest {
    clusterId: string;
    commandId: string;
    contextId: string;
}

export interface CommandStatusResponse {
    id?: string;
    results?: Results;
    status?: CommandStatus;
}

export interface ComputeSpec {
    /**
     * The kind of compute described by this compute specification.
     */
    kind?: ComputeSpecKind;
}

/**
 * The kind of compute described by this compute specification.
 */
export type ComputeSpecKind = "SERVERLESS_PREVIEW";

export type ContextStatus = "Error" | "Pending" | "Running";

/**
 * Get status
 */
export interface ContextStatusRequest {
    clusterId: string;
    contextId: string;
}

export interface ContextStatusResponse {
    id?: string;
    status?: ContextStatus;
}

export interface CreateCluster {
    /**
     * Note: This field won't be true for webapp requests. Only API users will
     * check this field.
     */
    apply_policy_default_values?: boolean;
    /**
     * Parameters needed in order to automatically scale clusters up and down
     * based on load. Note: autoscaling works best with DB runtime versions 3.0
     * or later.
     */
    autoscale?: AutoScale;
    /**
     * Automatically terminates the cluster after it is inactive for this time in
     * minutes. If not set, this cluster will not be automatically terminated. If
     * specified, the threshold must be between 10 and 10000 minutes. Users can
     * also set this value to 0 to explicitly disable automatic termination.
     */
    autotermination_minutes?: number;
    /**
     * Attributes related to clusters running on Amazon Web Services. If not
     * specified at cluster creation, a set of default values will be used.
     */
    aws_attributes?: AwsAttributes;
    /**
     * Attributes related to clusters running on Microsoft Azure. If not
     * specified at cluster creation, a set of default values will be used.
     */
    azure_attributes?: AzureAttributes;
    /**
     * The configuration for delivering spark logs to a long-term storage
     * destination. Two kinds of destinations (dbfs and s3) are supported. Only
     * one destination can be specified for one cluster. If the conf is given,
     * the logs will be delivered to the destination every `5 mins`. The
     * destination of driver logs is `$destination/$clusterId/driver`, while the
     * destination of executor logs is `$destination/$clusterId/executor`.
     */
    cluster_log_conf?: ClusterLogConf;
    /**
     * Cluster name requested by the user. This doesn't have to be unique. If not
     * specified at creation, the cluster name will be an empty string.
     */
    cluster_name?: string;
    /**
     * Determines whether the cluster was created by a user through the UI,
     * created by the Databricks Jobs Scheduler, or through an API request. This
     * is the same as cluster_creator, but read only.
     */
    cluster_source?: ClusterSource;
    /**
     * Additional tags for cluster resources. Databricks will tag all cluster
     * resources (e.g., AWS instances and EBS volumes) with these tags in
     * addition to `default_tags`. Notes:
     *
     * - Currently, Databricks allows at most 45 custom tags
     *
     * - Clusters can only reuse cloud resources if the resources' tags are a
     * subset of the cluster tags
     */
    custom_tags?: Record<string, string>;
    /**
     * The optional ID of the instance pool for the driver of the cluster
     * belongs. The pool cluster uses the instance pool with id
     * (instance_pool_id) if the driver pool is not assigned.
     */
    driver_instance_pool_id?: string;
    /**
     * The node type of the Spark driver. Note that this field is optional; if
     * unset, the driver node type will be set as the same value as
     * `node_type_id` defined above.
     */
    driver_node_type_id?: string;
    /**
     * Autoscaling Local Storage: when enabled, this cluster will dynamically
     * acquire additional disk space when its Spark workers are running low on
     * disk space. This feature requires specific AWS permissions to function
     * correctly - refer to the User Guide for more details.
     */
    enable_elastic_disk?: boolean;
    /**
     * Whether to enable LUKS on cluster VMs' local disks
     */
    enable_local_disk_encryption?: boolean;
    /**
     * Attributes related to clusters running on Google Cloud Platform. If not
     * specified at cluster creation, a set of default values will be used.
     */
    gcp_attributes?: GcpAttributes;
    /**
     * The configuration for storing init scripts. Any number of destinations can
     * be specified. The scripts are executed sequentially in the order provided.
     * If `cluster_log_conf` is specified, init script logs are sent to
     * `<destination>/<cluster-ID>/init_scripts`.
     */
    init_scripts?: Array<InitScriptInfo>;
    /**
     * The optional ID of the instance pool to which the cluster belongs.
     */
    instance_pool_id?: string;
    /**
     * This field encodes, through a single value, the resources available to
     * each of the Spark nodes in this cluster. For example, the Spark nodes can
     * be provisioned and optimized for memory or compute intensive workloads. A
     * list of available node types can be retrieved by using the
     * :method:clusters/listNodeTypes API call.
     */
    node_type_id?: string;
    /**
     * Number of worker nodes that this cluster should have. A cluster has one
     * Spark Driver and `num_workers` Executors for a total of `num_workers` + 1
     * Spark nodes.
     *
     * Note: When reading the properties of a cluster, this field reflects the
     * desired number of workers rather than the actual current number of
     * workers. For instance, if a cluster is resized from 5 to 10 workers, this
     * field will immediately be updated to reflect the target size of 10
     * workers, whereas the workers listed in `spark_info` will gradually
     * increase from 5 to 10 as the new nodes are provisioned.
     */
    num_workers?: number;
    /**
     * The ID of the cluster policy used to create the cluster if applicable.
     */
    policy_id?: string;
    /**
     * Decides which runtime engine to be use, e.g. Standard vs. Photon. If
     * unspecified, the runtime engine is inferred from spark_version.
     */
    runtime_engine?: RuntimeEngine;
    /**
     * An object containing a set of optional, user-specified Spark configuration
     * key-value pairs. Users can also pass in a string of extra JVM options to
     * the driver and the executors via `spark.driver.extraJavaOptions` and
     * `spark.executor.extraJavaOptions` respectively.
     */
    spark_conf?: Record<string, string>;
    /**
     * An object containing a set of optional, user-specified environment
     * variable key-value pairs. Please note that key-value pair of the form
     * (X,Y) will be exported as is (i.e., `export X='Y'`) while launching the
     * driver and workers.
     *
     * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we
     * recommend appending them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the
     * example below. This ensures that all default databricks managed
     * environmental variables are included as well.
     *
     * Example Spark environment variables: `{"SPARK_WORKER_MEMORY": "28000m",
     * "SPARK_LOCAL_DIRS": "/local_disk0"}` or `{"SPARK_DAEMON_JAVA_OPTS":
     * "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
     */
    spark_env_vars?: Record<string, string>;
    /**
     * The Spark version of the cluster, e.g. `3.3.x-scala2.11`. A list of
     * available Spark versions can be retrieved by using the
     * :method:clusters/sparkVersions API call.
     */
    spark_version: string;
    /**
     * SSH public key contents that will be added to each Spark node in this
     * cluster. The corresponding private keys can be used to login with the user
     * name `ubuntu` on port `2200`. Up to 10 keys can be specified.
     */
    ssh_public_keys?: Array<string>;
    workload_type?: WorkloadType;
}

export interface CreateClusterResponse {
    cluster_id?: string;
}

export interface CreateContext {
    /**
     * Running cluster id
     */
    clusterId?: string;
    language?: Language;
}

export interface CreateInstancePool {
    /**
     * Attributes related to instance pools running on Amazon Web Services. If
     * not specified at pool creation, a set of default values will be used.
     */
    aws_attributes?: InstancePoolAwsAttributes;
    /**
     * Attributes related to instance pools running on Azure. If not specified at
     * pool creation, a set of default values will be used.
     */
    azure_attributes?: InstancePoolAzureAttributes;
    /**
     * Additional tags for pool resources. Databricks will tag all pool resources
     * (e.g., AWS instances and EBS volumes) with these tags in addition to
     * `default_tags`. Notes:
     *
     * - Currently, Databricks allows at most 45 custom tags
     */
    custom_tags?: Record<string, string>;
    /**
     * Defines the specification of the disks that will be attached to all spark
     * containers.
     */
    disk_spec?: DiskSpec;
    /**
     * Autoscaling Local Storage: when enabled, this instances in this pool will
     * dynamically acquire additional disk space when its Spark workers are
     * running low on disk space. In AWS, this feature requires specific AWS
     * permissions to function correctly - refer to the User Guide for more
     * details.
     */
    enable_elastic_disk?: boolean;
    /**
     * Attributes related to instance pools running on Google Cloud Platform. If
     * not specified at pool creation, a set of default values will be used.
     */
    gcp_attributes?: InstancePoolGcpAttributes;
    /**
     * Automatically terminates the extra instances in the pool cache after they
     * are inactive for this time in minutes if min_idle_instances requirement is
     * already met. If not set, the extra pool instances will be automatically
     * terminated after a default timeout. If specified, the threshold must be
     * between 0 and 10000 minutes. Users can also set this value to 0 to
     * instantly remove idle instances from the cache if min cache size could
     * still hold.
     */
    idle_instance_autotermination_minutes?: number;
    /**
     * The fleet related setting to power the instance pool.
     */
    instance_pool_fleet_attributes?: InstancePoolFleetAttributes;
    /**
     * Pool name requested by the user. Pool name must be unique. Length must be
     * between 1 and 100 characters.
     */
    instance_pool_name: string;
    /**
     * Maximum number of outstanding instances to keep in the pool, including
     * both instances used by clusters and idle instances. Clusters that require
     * further instance provisioning will fail during upsize requests.
     */
    max_capacity?: number;
    /**
     * Minimum number of idle instances to keep in the instance pool
     */
    min_idle_instances?: number;
    /**
     * This field encodes, through a single value, the resources available to
     * each of the Spark nodes in this cluster. For example, the Spark nodes can
     * be provisioned and optimized for memory or compute intensive workloads. A
     * list of available node types can be retrieved by using the
     * :method:clusters/listNodeTypes API call.
     */
    node_type_id: string;
    /**
     * Custom Docker Image BYOC
     */
    preloaded_docker_images?: Array<DockerImage>;
    /**
     * A list of preloaded Spark image versions for the pool. Pool-backed
     * clusters started with the preloaded Spark version will start faster. A
     * list of available Spark versions can be retrieved by using the
     * :method:clusters/sparkVersions API call.
     */
    preloaded_spark_versions?: Array<string>;
}

export interface CreateInstancePoolResponse {
    /**
     * The ID of the created instance pool.
     */
    instance_pool_id?: string;
}

export interface CreatePolicy {
    /**
     * Policy definition document expressed in Databricks Cluster Policy
     * Definition Language.
     */
    definition?: string;
    /**
     * Additional human-readable description of the cluster policy.
     */
    description?: string;
    /**
     * Max number of clusters per user that can be active using this policy. If
     * not present, there is no max limit.
     */
    max_clusters_per_user?: number;
    /**
     * Cluster Policy name requested by the user. This has to be unique. Length
     * must be between 1 and 100 characters.
     */
    name: string;
    /**
     * Policy definition JSON document expressed in Databricks Policy Definition
     * Language. The JSON document must be passed as a string and cannot be
     * embedded in the requests.
     *
     * You can use this to customize the policy definition inherited from the
     * policy family. Policy rules specified here are merged into the inherited
     * policy definition.
     */
    policy_family_definition_overrides?: string;
    /**
     * ID of the policy family. The cluster policy's policy definition inherits
     * the policy family's policy definition.
     *
     * Cannot be used with `definition`. Use `policy_family_definition_overrides`
     * instead to customize the policy definition.
     */
    policy_family_id?: string;
}

export interface CreatePolicyResponse {
    /**
     * Canonical unique identifier for the cluster policy.
     */
    policy_id?: string;
}

export interface CreateResponse {
    /**
     * The global init script ID.
     */
    script_id?: string;
}

export interface Created {
    id?: string;
}

export interface DataPlaneEventDetails {
    /**
     * <needs content added>
     */
    event_type?: DataPlaneEventDetailsEventType;
    /**
     * <needs content added>
     */
    executor_failures?: number;
    /**
     * <needs content added>
     */
    host_id?: string;
    /**
     * <needs content added>
     */
    timestamp?: number;
}

/**
 * <needs content added>
 */
export type DataPlaneEventDetailsEventType =
    | "NODE_BLACKLISTED"
    | "NODE_EXCLUDED_DECOMMISSIONED";

/**
 * This describes an enum
 */
export type DataSecurityMode =
    /**
     * This mode is for users migrating from legacy Passthrough on high concurrency
     * clusters.
     */
    | "LEGACY_PASSTHROUGH"
    /**
     * This mode is for users migrating from legacy Passthrough on standard clusters.
     */
    | "LEGACY_SINGLE_USER"
    /**
     * This mode is for users migrating from legacy Table ACL clusters.
     */
    | "LEGACY_TABLE_ACL"
    /**
     * No security isolation for multiple users sharing the cluster. Data governance
     * features are not available in this mode.
     */
    | "NONE"
    /**
     * A secure cluster that can only be exclusively used by a single user specified
     * in `single_user_name`. Most programming languages, cluster features and data
     * governance features are available in this mode.
     */
    | "SINGLE_USER"
    /**
     * A secure cluster that can be shared by multiple users. Cluster users are fully
     * isolated so that they cannot see each other's data and credentials. Most data
     * governance features are supported in this mode. But programming languages and
     * cluster features might be limited.
     */
    | "USER_ISOLATION";

export interface DbfsStorageInfo {
    /**
     * dbfs destination, e.g. `dbfs:/my/path`
     */
    destination?: string;
}

export interface DeleteCluster {
    /**
     * The cluster to be terminated.
     */
    cluster_id: string;
}

/**
 * Delete init script
 */
export interface DeleteGlobalInitScriptRequest {
    /**
     * The ID of the global init script.
     */
    script_id: string;
}

export interface DeleteInstancePool {
    /**
     * The instance pool to be terminated.
     */
    instance_pool_id: string;
}

export interface DeletePolicy {
    /**
     * The ID of the policy to delete.
     */
    policy_id: string;
}

export interface DestroyContext {
    clusterId: string;
    contextId: string;
}

export interface DiskSpec {
    /**
     * The number of disks launched for each instance: - This feature is only
     * enabled for supported node types. - Users can choose up to the limit of
     * the disks supported by the node type. - For node types with no OS disk, at
     * least one disk must be specified; otherwise, cluster creation will fail.
     *
     * If disks are attached, Databricks will configure Spark to use only the
     * disks for scratch storage, because heterogenously sized scratch devices
     * can lead to inefficient disk utilization. If no disks are attached,
     * Databricks will configure Spark to use instance store disks.
     *
     * Note: If disks are specified, then the Spark configuration
     * `spark.local.dir` will be overridden.
     *
     * Disks will be mounted at: - For AWS: `/ebs0`, `/ebs1`, and etc. - For
     * Azure: `/remote_volume0`, `/remote_volume1`, and etc.
     */
    disk_count?: number;
    disk_iops?: number;
    /**
     * The size of each disk (in GiB) launched for each instance. Values must
     * fall into the supported range for a particular instance type.
     *
     * For AWS: - General Purpose SSD: 100 - 4096 GiB - Throughput Optimized HDD:
     * 500 - 4096 GiB
     *
     * For Azure: - Premium LRS (SSD): 1 - 1023 GiB - Standard LRS (HDD): 1- 1023
     * GiB
     */
    disk_size?: number;
    disk_throughput?: number;
    /**
     * The type of disks that will be launched with this cluster.
     */
    disk_type?: DiskType;
}

export interface DiskType {
    azure_disk_volume_type?: DiskTypeAzureDiskVolumeType;
    ebs_volume_type?: DiskTypeEbsVolumeType;
}

export type DiskTypeAzureDiskVolumeType = "PREMIUM_LRS" | "STANDARD_LRS";

export type DiskTypeEbsVolumeType =
    | "GENERAL_PURPOSE_SSD"
    | "THROUGHPUT_OPTIMIZED_HDD";

export interface DockerBasicAuth {
    /**
     * Password of the user
     */
    password?: string;
    /**
     * Name of the user
     */
    username?: string;
}

export interface DockerImage {
    basic_auth?: DockerBasicAuth;
    /**
     * URL of the docker image.
     */
    url?: string;
}

/**
 * The type of EBS volumes that will be launched with this cluster.
 */
export type EbsVolumeType = "GENERAL_PURPOSE_SSD" | "THROUGHPUT_OPTIMIZED_HDD";

export interface EditCluster {
    /**
     * Note: This field won't be true for webapp requests. Only API users will
     * check this field.
     */
    apply_policy_default_values?: boolean;
    /**
     * Parameters needed in order to automatically scale clusters up and down
     * based on load. Note: autoscaling works best with DB runtime versions 3.0
     * or later.
     */
    autoscale?: AutoScale;
    /**
     * Automatically terminates the cluster after it is inactive for this time in
     * minutes. If not set, this cluster will not be automatically terminated. If
     * specified, the threshold must be between 10 and 10000 minutes. Users can
     * also set this value to 0 to explicitly disable automatic termination.
     */
    autotermination_minutes?: number;
    /**
     * Attributes related to clusters running on Amazon Web Services. If not
     * specified at cluster creation, a set of default values will be used.
     */
    aws_attributes?: AwsAttributes;
    /**
     * Attributes related to clusters running on Microsoft Azure. If not
     * specified at cluster creation, a set of default values will be used.
     */
    azure_attributes?: AzureAttributes;
    /**
     * ID of the cluser
     */
    cluster_id: string;
    /**
     * The configuration for delivering spark logs to a long-term storage
     * destination. Two kinds of destinations (dbfs and s3) are supported. Only
     * one destination can be specified for one cluster. If the conf is given,
     * the logs will be delivered to the destination every `5 mins`. The
     * destination of driver logs is `$destination/$clusterId/driver`, while the
     * destination of executor logs is `$destination/$clusterId/executor`.
     */
    cluster_log_conf?: ClusterLogConf;
    /**
     * Cluster name requested by the user. This doesn't have to be unique. If not
     * specified at creation, the cluster name will be an empty string.
     */
    cluster_name?: string;
    /**
     * Determines whether the cluster was created by a user through the UI,
     * created by the Databricks Jobs Scheduler, or through an API request. This
     * is the same as cluster_creator, but read only.
     */
    cluster_source?: ClusterSource;
    /**
     * Additional tags for cluster resources. Databricks will tag all cluster
     * resources (e.g., AWS instances and EBS volumes) with these tags in
     * addition to `default_tags`. Notes:
     *
     * - Currently, Databricks allows at most 45 custom tags
     *
     * - Clusters can only reuse cloud resources if the resources' tags are a
     * subset of the cluster tags
     */
    custom_tags?: Record<string, string>;
    /**
     * This describes an enum
     */
    data_security_mode?: DataSecurityMode;
    docker_image?: DockerImage;
    /**
     * The optional ID of the instance pool for the driver of the cluster
     * belongs. The pool cluster uses the instance pool with id
     * (instance_pool_id) if the driver pool is not assigned.
     */
    driver_instance_pool_id?: string;
    /**
     * The node type of the Spark driver. Note that this field is optional; if
     * unset, the driver node type will be set as the same value as
     * `node_type_id` defined above.
     */
    driver_node_type_id?: string;
    /**
     * Autoscaling Local Storage: when enabled, this cluster will dynamically
     * acquire additional disk space when its Spark workers are running low on
     * disk space. This feature requires specific AWS permissions to function
     * correctly - refer to the User Guide for more details.
     */
    enable_elastic_disk?: boolean;
    /**
     * Whether to enable LUKS on cluster VMs' local disks
     */
    enable_local_disk_encryption?: boolean;
    /**
     * Attributes related to clusters running on Google Cloud Platform. If not
     * specified at cluster creation, a set of default values will be used.
     */
    gcp_attributes?: GcpAttributes;
    /**
     * The configuration for storing init scripts. Any number of destinations can
     * be specified. The scripts are executed sequentially in the order provided.
     * If `cluster_log_conf` is specified, init script logs are sent to
     * `<destination>/<cluster-ID>/init_scripts`.
     */
    init_scripts?: Array<InitScriptInfo>;
    /**
     * The optional ID of the instance pool to which the cluster belongs.
     */
    instance_pool_id?: string;
    /**
     * This field encodes, through a single value, the resources available to
     * each of the Spark nodes in this cluster. For example, the Spark nodes can
     * be provisioned and optimized for memory or compute intensive workloads. A
     * list of available node types can be retrieved by using the
     * :method:clusters/listNodeTypes API call.
     */
    node_type_id?: string;
    /**
     * Number of worker nodes that this cluster should have. A cluster has one
     * Spark Driver and `num_workers` Executors for a total of `num_workers` + 1
     * Spark nodes.
     *
     * Note: When reading the properties of a cluster, this field reflects the
     * desired number of workers rather than the actual current number of
     * workers. For instance, if a cluster is resized from 5 to 10 workers, this
     * field will immediately be updated to reflect the target size of 10
     * workers, whereas the workers listed in `spark_info` will gradually
     * increase from 5 to 10 as the new nodes are provisioned.
     */
    num_workers?: number;
    /**
     * The ID of the cluster policy used to create the cluster if applicable.
     */
    policy_id?: string;
    /**
     * Decides which runtime engine to be use, e.g. Standard vs. Photon. If
     * unspecified, the runtime engine is inferred from spark_version.
     */
    runtime_engine?: RuntimeEngine;
    /**
     * Single user name if data_security_mode is `SINGLE_USER`
     */
    single_user_name?: string;
    /**
     * An object containing a set of optional, user-specified Spark configuration
     * key-value pairs. Users can also pass in a string of extra JVM options to
     * the driver and the executors via `spark.driver.extraJavaOptions` and
     * `spark.executor.extraJavaOptions` respectively.
     */
    spark_conf?: Record<string, string>;
    /**
     * An object containing a set of optional, user-specified environment
     * variable key-value pairs. Please note that key-value pair of the form
     * (X,Y) will be exported as is (i.e., `export X='Y'`) while launching the
     * driver and workers.
     *
     * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we
     * recommend appending them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the
     * example below. This ensures that all default databricks managed
     * environmental variables are included as well.
     *
     * Example Spark environment variables: `{"SPARK_WORKER_MEMORY": "28000m",
     * "SPARK_LOCAL_DIRS": "/local_disk0"}` or `{"SPARK_DAEMON_JAVA_OPTS":
     * "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
     */
    spark_env_vars?: Record<string, string>;
    /**
     * The Spark version of the cluster, e.g. `3.3.x-scala2.11`. A list of
     * available Spark versions can be retrieved by using the
     * :method:clusters/sparkVersions API call.
     */
    spark_version: string;
    /**
     * SSH public key contents that will be added to each Spark node in this
     * cluster. The corresponding private keys can be used to login with the user
     * name `ubuntu` on port `2200`. Up to 10 keys can be specified.
     */
    ssh_public_keys?: Array<string>;
    workload_type?: WorkloadType;
}

export interface EditInstancePool {
    /**
     * Attributes related to instance pools running on Amazon Web Services. If
     * not specified at pool creation, a set of default values will be used.
     */
    aws_attributes?: InstancePoolAwsAttributes;
    /**
     * Attributes related to instance pools running on Azure. If not specified at
     * pool creation, a set of default values will be used.
     */
    azure_attributes?: InstancePoolAzureAttributes;
    /**
     * Additional tags for pool resources. Databricks will tag all pool resources
     * (e.g., AWS instances and EBS volumes) with these tags in addition to
     * `default_tags`. Notes:
     *
     * - Currently, Databricks allows at most 45 custom tags
     */
    custom_tags?: Record<string, string>;
    /**
     * Defines the specification of the disks that will be attached to all spark
     * containers.
     */
    disk_spec?: DiskSpec;
    /**
     * Autoscaling Local Storage: when enabled, this instances in this pool will
     * dynamically acquire additional disk space when its Spark workers are
     * running low on disk space. In AWS, this feature requires specific AWS
     * permissions to function correctly - refer to the User Guide for more
     * details.
     */
    enable_elastic_disk?: boolean;
    /**
     * Attributes related to instance pools running on Google Cloud Platform. If
     * not specified at pool creation, a set of default values will be used.
     */
    gcp_attributes?: InstancePoolGcpAttributes;
    /**
     * Automatically terminates the extra instances in the pool cache after they
     * are inactive for this time in minutes if min_idle_instances requirement is
     * already met. If not set, the extra pool instances will be automatically
     * terminated after a default timeout. If specified, the threshold must be
     * between 0 and 10000 minutes. Users can also set this value to 0 to
     * instantly remove idle instances from the cache if min cache size could
     * still hold.
     */
    idle_instance_autotermination_minutes?: number;
    /**
     * The fleet related setting to power the instance pool.
     */
    instance_pool_fleet_attributes?: InstancePoolFleetAttributes;
    /**
     * Instance pool ID
     */
    instance_pool_id: string;
    /**
     * Pool name requested by the user. Pool name must be unique. Length must be
     * between 1 and 100 characters.
     */
    instance_pool_name: string;
    /**
     * Maximum number of outstanding instances to keep in the pool, including
     * both instances used by clusters and idle instances. Clusters that require
     * further instance provisioning will fail during upsize requests.
     */
    max_capacity?: number;
    /**
     * Minimum number of idle instances to keep in the instance pool
     */
    min_idle_instances?: number;
    /**
     * This field encodes, through a single value, the resources available to
     * each of the Spark nodes in this cluster. For example, the Spark nodes can
     * be provisioned and optimized for memory or compute intensive workloads. A
     * list of available node types can be retrieved by using the
     * :method:clusters/listNodeTypes API call.
     */
    node_type_id: string;
    /**
     * Custom Docker Image BYOC
     */
    preloaded_docker_images?: Array<DockerImage>;
    /**
     * A list of preloaded Spark image versions for the pool. Pool-backed
     * clusters started with the preloaded Spark version will start faster. A
     * list of available Spark versions can be retrieved by using the
     * :method:clusters/sparkVersions API call.
     */
    preloaded_spark_versions?: Array<string>;
}

export interface EditPolicy {
    /**
     * Policy definition document expressed in Databricks Cluster Policy
     * Definition Language.
     */
    definition?: string;
    /**
     * Additional human-readable description of the cluster policy.
     */
    description?: string;
    /**
     * Max number of clusters per user that can be active using this policy. If
     * not present, there is no max limit.
     */
    max_clusters_per_user?: number;
    /**
     * Cluster Policy name requested by the user. This has to be unique. Length
     * must be between 1 and 100 characters.
     */
    name: string;
    /**
     * Policy definition JSON document expressed in Databricks Policy Definition
     * Language. The JSON document must be passed as a string and cannot be
     * embedded in the requests.
     *
     * You can use this to customize the policy definition inherited from the
     * policy family. Policy rules specified here are merged into the inherited
     * policy definition.
     */
    policy_family_definition_overrides?: string;
    /**
     * ID of the policy family. The cluster policy's policy definition inherits
     * the policy family's policy definition.
     *
     * Cannot be used with `definition`. Use `policy_family_definition_overrides`
     * instead to customize the policy definition.
     */
    policy_family_id?: string;
    /**
     * The ID of the policy to update.
     */
    policy_id: string;
}

export interface EventDetails {
    /**
     * * For created clusters, the attributes of the cluster. * For edited
     * clusters, the new attributes of the cluster.
     */
    attributes?: ClusterAttributes;
    /**
     * The cause of a change in target size.
     */
    cause?: EventDetailsCause;
    /**
     * The actual cluster size that was set in the cluster creation or edit.
     */
    cluster_size?: ClusterSize;
    /**
     * The current number of vCPUs in the cluster.
     */
    current_num_vcpus?: number;
    /**
     * The current number of nodes in the cluster.
     */
    current_num_workers?: number;
    /**
     * <needs content added>
     */
    did_not_expand_reason?: string;
    /**
     * Current disk size in bytes
     */
    disk_size?: number;
    /**
     * More details about the change in driver's state
     */
    driver_state_message?: string;
    /**
     * Whether or not a blocklisted node should be terminated. For
     * ClusterEventType NODE_BLACKLISTED.
     */
    enable_termination_for_node_blocklisted?: boolean;
    /**
     * <needs content added>
     */
    free_space?: number;
    /**
     * Instance Id where the event originated from
     */
    instance_id?: string;
    /**
     * Unique identifier of the specific job run associated with this cluster
     * event * For clusters created for jobs, this will be the same as the
     * cluster name
     */
    job_run_name?: string;
    /**
     * The cluster attributes before a cluster was edited.
     */
    previous_attributes?: ClusterAttributes;
    /**
     * The size of the cluster before an edit or resize.
     */
    previous_cluster_size?: ClusterSize;
    /**
     * Previous disk size in bytes
     */
    previous_disk_size?: number;
    /**
     * A termination reason: * On a TERMINATED event, this is the reason of the
     * termination. * On a RESIZE_COMPLETE event, this indicates the reason that
     * we failed to acquire some nodes.
     */
    reason?: TerminationReason;
    /**
     * The targeted number of vCPUs in the cluster.
     */
    target_num_vcpus?: number;
    /**
     * The targeted number of nodes in the cluster.
     */
    target_num_workers?: number;
    /**
     * The user that caused the event to occur. (Empty if it was done by the
     * control plane.)
     */
    user?: string;
}

/**
 * The cause of a change in target size.
 */
export type EventDetailsCause =
    | "AUTORECOVERY"
    | "AUTOSCALE"
    | "REPLACE_BAD_NODES"
    | "USER_REQUEST";

export type EventType =
    | "AUTOSCALING_STATS_REPORT"
    | "CREATING"
    | "DBFS_DOWN"
    | "DID_NOT_EXPAND_DISK"
    | "DRIVER_HEALTHY"
    | "DRIVER_NOT_RESPONDING"
    | "DRIVER_UNAVAILABLE"
    | "EDITED"
    | "EXPANDED_DISK"
    | "FAILED_TO_EXPAND_DISK"
    | "INIT_SCRIPTS_FINISHED"
    | "INIT_SCRIPTS_STARTED"
    | "METASTORE_DOWN"
    | "NODE_BLACKLISTED"
    | "NODE_EXCLUDED_DECOMMISSIONED"
    | "NODES_LOST"
    | "PINNED"
    | "RESIZING"
    | "RESTARTING"
    | "RUNNING"
    | "SPARK_EXCEPTION"
    | "STARTING"
    | "TERMINATING"
    | "UNPINNED"
    | "UPSIZE_COMPLETED";

export interface FleetLaunchTemplateOverride {
    /**
     * User-assigned preferred availability zone. It will adjust to the default
     * zone of the worker environment if the preferred zone does not exist in the
     * subnet.
     */
    availability_zone: string;
    instance_type: string;
    /**
     * The maximum price per unit hour that you are willing to pay for a Spot
     * Instance.
     */
    max_price?: number;
    /**
     * The priority for the launch template override. If AllocationStrategy is
     * set to prioritized, EC2 Fleet uses priority to determine which launch
     * template override or to use first in fulfilling On-Demand capacity. The
     * highest priority is launched first. Valid values are whole numbers
     * starting at 0. The lower the number, the higher the priority. If no number
     * is set, the launch template override has the lowest priority.
     */
    priority?: number;
}

export interface FleetOnDemandOption {
    /**
     * Only lowest-price and prioritized are allowed
     */
    allocation_strategy?: FleetOnDemandOptionAllocationStrategy;
    /**
     * The maximum amount per hour for On-Demand Instances that you're willing to
     * pay.
     */
    max_total_price?: number;
    /**
     * If you specify use-capacity-reservations-first, the fleet uses unused
     * Capacity Reservations to fulfill On-Demand capacity up to the target
     * On-Demand capacity. If multiple instance pools have unused Capacity
     * Reservations, the On-Demand allocation strategy (lowest-price or
     * prioritized) is applied. If the number of unused Capacity Reservations is
     * less than the On-Demand target capacity, the remaining On-Demand target
     * capacity is launched according to the On-Demand allocation strategy
     * (lowest-price or prioritized).
     */
    use_capacity_reservations_first?: boolean;
}

/**
 * Only lowest-price and prioritized are allowed
 */
export type FleetOnDemandOptionAllocationStrategy =
    | "CAPACITY_OPTIMIZED"
    | "DIVERSIFIED"
    | "LOWEST_PRICE"
    | "PRIORITIZED";

export interface FleetSpotOption {
    /**
     * lowest-price | diversified | capacity-optimized
     */
    allocation_strategy?: FleetSpotOptionAllocationStrategy;
    /**
     * The number of Spot pools across which to allocate your target Spot
     * capacity. Valid only when Spot Allocation Strategy is set to lowest-price.
     * EC2 Fleet selects the cheapest Spot pools and evenly allocates your target
     * Spot capacity across the number of Spot pools that you specify.
     */
    instance_pools_to_use_count?: number;
    /**
     * The maximum amount per hour for Spot Instances that you're willing to pay.
     */
    max_total_price?: number;
}

/**
 * lowest-price | diversified | capacity-optimized
 */
export type FleetSpotOptionAllocationStrategy =
    | "CAPACITY_OPTIMIZED"
    | "DIVERSIFIED"
    | "LOWEST_PRICE"
    | "PRIORITIZED";

export interface GcpAttributes {
    /**
     * This field determines whether the instance pool will contain preemptible
     * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if
     * the former is unavailable.
     */
    availability?: GcpAvailability;
    /**
     * boot disk size in GB
     */
    boot_disk_size?: number;
    /**
     * If provided, the cluster will impersonate the google service account when
     * accessing gcloud services (like GCS). The google service account must have
     * previously been added to the Databricks environment by an account
     * administrator.
     */
    google_service_account?: string;
    /**
     * If provided, each node (workers and driver) in the cluster will have this
     * number of local SSDs attached. Each local SSD is 375GB in size. Refer to
     * [GCP documentation] for the supported number of local SSDs for each
     * instance type.
     *
     * [GCP documentation]: https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds
     */
    local_ssd_count?: number;
}

/**
 * This field determines whether the instance pool will contain preemptible VMs,
 * on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if the
 * former is unavailable.
 */
export type GcpAvailability =
    | "ON_DEMAND_GCP"
    | "PREEMPTIBLE_GCP"
    | "PREEMPTIBLE_WITH_FALLBACK_GCP";

/**
 * Get entity
 */
export interface GetClusterPolicyRequest {
    /**
     * Canonical unique identifier for the cluster policy.
     */
    policy_id: string;
}

/**
 * Get cluster info
 */
export interface GetClusterRequest {
    /**
     * The cluster about which to retrieve information.
     */
    cluster_id: string;
}

export interface GetEvents {
    /**
     * The ID of the cluster to retrieve events about.
     */
    cluster_id: string;
    /**
     * The end time in epoch milliseconds. If empty, returns events up to the
     * current time.
     */
    end_time?: number;
    /**
     * An optional set of event types to filter on. If empty, all event types are
     * returned.
     */
    event_types?: Array<EventType>;
    /**
     * The maximum number of events to include in a page of events. Defaults to
     * 50, and maximum allowed value is 500.
     */
    limit?: number;
    /**
     * The offset in the result set. Defaults to 0 (no offset). When an offset is
     * specified and the results are requested in descending order, the end_time
     * field is required.
     */
    offset?: number;
    /**
     * The order to list events in; either "ASC" or "DESC". Defaults to "DESC".
     */
    order?: GetEventsOrder;
    /**
     * The start time in epoch milliseconds. If empty, returns events starting
     * from the beginning of time.
     */
    start_time?: number;
}

/**
 * The order to list events in; either "ASC" or "DESC". Defaults to "DESC".
 */
export type GetEventsOrder = "ASC" | "DESC";

export interface GetEventsResponse {
    /**
     * <content needs to be added>
     */
    events?: Array<ClusterEvent>;
    /**
     * The parameters required to retrieve the next page of events. Omitted if
     * there are no more events to read.
     */
    next_page?: GetEvents;
    /**
     * The total number of events filtered by the start_time, end_time, and
     * event_types.
     */
    total_count?: number;
}

/**
 * Get an init script
 */
export interface GetGlobalInitScriptRequest {
    /**
     * The ID of the global init script.
     */
    script_id: string;
}

export interface GetInstancePool {
    /**
     * Attributes related to instance pools running on Amazon Web Services. If
     * not specified at pool creation, a set of default values will be used.
     */
    aws_attributes?: InstancePoolAwsAttributes;
    /**
     * Attributes related to instance pools running on Azure. If not specified at
     * pool creation, a set of default values will be used.
     */
    azure_attributes?: InstancePoolAzureAttributes;
    /**
     * Additional tags for pool resources. Databricks will tag all pool resources
     * (e.g., AWS instances and EBS volumes) with these tags in addition to
     * `default_tags`. Notes:
     *
     * - Currently, Databricks allows at most 45 custom tags
     */
    custom_tags?: Record<string, string>;
    /**
     * Tags that are added by Databricks regardless of any `custom_tags`,
     * including:
     *
     * - Vendor: Databricks
     *
     * - InstancePoolCreator: <user_id_of_creator>
     *
     * - InstancePoolName: <name_of_pool>
     *
     * - InstancePoolId: <id_of_pool>
     */
    default_tags?: Record<string, string>;
    /**
     * Defines the specification of the disks that will be attached to all spark
     * containers.
     */
    disk_spec?: DiskSpec;
    /**
     * Autoscaling Local Storage: when enabled, this instances in this pool will
     * dynamically acquire additional disk space when its Spark workers are
     * running low on disk space. In AWS, this feature requires specific AWS
     * permissions to function correctly - refer to the User Guide for more
     * details.
     */
    enable_elastic_disk?: boolean;
    /**
     * Attributes related to instance pools running on Google Cloud Platform. If
     * not specified at pool creation, a set of default values will be used.
     */
    gcp_attributes?: InstancePoolGcpAttributes;
    /**
     * Automatically terminates the extra instances in the pool cache after they
     * are inactive for this time in minutes if min_idle_instances requirement is
     * already met. If not set, the extra pool instances will be automatically
     * terminated after a default timeout. If specified, the threshold must be
     * between 0 and 10000 minutes. Users can also set this value to 0 to
     * instantly remove idle instances from the cache if min cache size could
     * still hold.
     */
    idle_instance_autotermination_minutes?: number;
    /**
     * The fleet related setting to power the instance pool.
     */
    instance_pool_fleet_attributes?: InstancePoolFleetAttributes;
    /**
     * Canonical unique identifier for the pool.
     */
    instance_pool_id: string;
    /**
     * Pool name requested by the user. Pool name must be unique. Length must be
     * between 1 and 100 characters.
     */
    instance_pool_name?: string;
    /**
     * Maximum number of outstanding instances to keep in the pool, including
     * both instances used by clusters and idle instances. Clusters that require
     * further instance provisioning will fail during upsize requests.
     */
    max_capacity?: number;
    /**
     * Minimum number of idle instances to keep in the instance pool
     */
    min_idle_instances?: number;
    /**
     * This field encodes, through a single value, the resources available to
     * each of the Spark nodes in this cluster. For example, the Spark nodes can
     * be provisioned and optimized for memory or compute intensive workloads. A
     * list of available node types can be retrieved by using the
     * :method:clusters/listNodeTypes API call.
     */
    node_type_id?: string;
    /**
     * Custom Docker Image BYOC
     */
    preloaded_docker_images?: Array<DockerImage>;
    /**
     * A list of preloaded Spark image versions for the pool. Pool-backed
     * clusters started with the preloaded Spark version will start faster. A
     * list of available Spark versions can be retrieved by using the
     * :method:clusters/sparkVersions API call.
     */
    preloaded_spark_versions?: Array<string>;
    /**
     * Current state of the instance pool.
     */
    state?: InstancePoolState;
    /**
     * Usage statistics about the instance pool.
     */
    stats?: InstancePoolStats;
    /**
     * Status of failed pending instances in the pool.
     */
    status?: InstancePoolStatus;
}

/**
 * Get instance pool information
 */
export interface GetInstancePoolRequest {
    /**
     * The canonical unique identifier for the instance pool.
     */
    instance_pool_id: string;
}

/**
 * Get policy family information
 */
export interface GetPolicyFamilyRequest {
    policy_family_id: string;
}

export interface GetSparkVersionsResponse {
    /**
     * All the available Spark versions.
     */
    versions?: Array<SparkVersion>;
}

export interface GlobalInitScriptCreateRequest {
    /**
     * Specifies whether the script is enabled. The script runs only if enabled.
     */
    enabled?: boolean;
    /**
     * The name of the script
     */
    name: string;
    /**
     * The position of a global init script, where 0 represents the first script
     * to run, 1 is the second script to run, in ascending order.
     *
     * If you omit the numeric position for a new global init script, it defaults
     * to last position. It will run after all current scripts. Setting any value
     * greater than the position of the last script is equivalent to the last
     * position. Example: Take three existing scripts with positions 0, 1, and 2.
     * Any position of (3) or greater puts the script in the last position. If an
     * explicit position value conflicts with an existing script value, your
     * request succeeds, but the original script at that position and all later
     * scripts have their positions incremented by 1.
     */
    position?: number;
    /**
     * The Base64-encoded content of the script.
     */
    script: string;
}

export interface GlobalInitScriptDetails {
    /**
     * Time when the script was created, represented as a Unix timestamp in
     * milliseconds.
     */
    created_at?: number;
    /**
     * The username of the user who created the script.
     */
    created_by?: string;
    /**
     * Specifies whether the script is enabled. The script runs only if enabled.
     */
    enabled?: boolean;
    /**
     * The name of the script
     */
    name?: string;
    /**
     * The position of a script, where 0 represents the first script to run, 1 is
     * the second script to run, in ascending order.
     */
    position?: number;
    /**
     * The global init script ID.
     */
    script_id?: string;
    /**
     * Time when the script was updated, represented as a Unix timestamp in
     * milliseconds.
     */
    updated_at?: number;
    /**
     * The username of the user who last updated the script
     */
    updated_by?: string;
}

export interface GlobalInitScriptDetailsWithContent {
    /**
     * Time when the script was created, represented as a Unix timestamp in
     * milliseconds.
     */
    created_at?: number;
    /**
     * The username of the user who created the script.
     */
    created_by?: string;
    /**
     * Specifies whether the script is enabled. The script runs only if enabled.
     */
    enabled?: boolean;
    /**
     * The name of the script
     */
    name?: string;
    /**
     * The position of a script, where 0 represents the first script to run, 1 is
     * the second script to run, in ascending order.
     */
    position?: number;
    /**
     * The Base64-encoded content of the script.
     */
    script?: string;
    /**
     * The global init script ID.
     */
    script_id?: string;
    /**
     * Time when the script was updated, represented as a Unix timestamp in
     * milliseconds.
     */
    updated_at?: number;
    /**
     * The username of the user who last updated the script
     */
    updated_by?: string;
}

export interface GlobalInitScriptUpdateRequest {
    /**
     * Specifies whether the script is enabled. The script runs only if enabled.
     */
    enabled?: boolean;
    /**
     * The name of the script
     */
    name: string;
    /**
     * The position of a script, where 0 represents the first script to run, 1 is
     * the second script to run, in ascending order. To move the script to run
     * first, set its position to 0.
     *
     * To move the script to the end, set its position to any value greater or
     * equal to the position of the last script. Example, three existing scripts
     * with positions 0, 1, and 2. Any position value of 2 or greater puts the
     * script in the last position (2).
     *
     * If an explicit position value conflicts with an existing script, your
     * request succeeds, but the original script at that position and all later
     * scripts have their positions incremented by 1.
     */
    position?: number;
    /**
     * The Base64-encoded content of the script.
     */
    script: string;
    /**
     * The ID of the global init script.
     */
    script_id: string;
}

export interface InitScriptInfo {
    /**
     * destination needs to be provided. e.g. `{ "dbfs" : { "destination" :
     * "dbfs:/home/cluster_log" } }`
     */
    dbfs?: DbfsStorageInfo;
    /**
     * destination and either the region or endpoint need to be provided. e.g. `{
     * "s3": { "destination" : "s3://cluster_log_bucket/prefix", "region" :
     * "us-west-2" } }` Cluster iam role is used to access s3, please make sure
     * the cluster iam role in `instance_profile_arn` has permission to write
     * data to the s3 destination.
     */
    s3?: S3StorageInfo;
    /**
     * destination needs to be provided. e.g. `{ "workspace" : { "destination" :
     * "/Users/user1@databricks.com/my-init.sh" } }`
     */
    workspace?: WorkspaceStorageInfo;
}

export interface InstallLibraries {
    /**
     * Unique identifier for the cluster on which to install these libraries.
     */
    cluster_id: string;
    /**
     * The libraries to install.
     */
    libraries: Array<Library>;
}

export interface InstancePoolAndStats {
    /**
     * Attributes related to instance pools running on Amazon Web Services. If
     * not specified at pool creation, a set of default values will be used.
     */
    aws_attributes?: InstancePoolAwsAttributes;
    /**
     * Attributes related to instance pools running on Azure. If not specified at
     * pool creation, a set of default values will be used.
     */
    azure_attributes?: InstancePoolAzureAttributes;
    /**
     * Additional tags for pool resources. Databricks will tag all pool resources
     * (e.g., AWS instances and EBS volumes) with these tags in addition to
     * `default_tags`. Notes:
     *
     * - Currently, Databricks allows at most 45 custom tags
     */
    custom_tags?: Record<string, string>;
    /**
     * Tags that are added by Databricks regardless of any `custom_tags`,
     * including:
     *
     * - Vendor: Databricks
     *
     * - InstancePoolCreator: <user_id_of_creator>
     *
     * - InstancePoolName: <name_of_pool>
     *
     * - InstancePoolId: <id_of_pool>
     */
    default_tags?: Record<string, string>;
    /**
     * Defines the specification of the disks that will be attached to all spark
     * containers.
     */
    disk_spec?: DiskSpec;
    /**
     * Autoscaling Local Storage: when enabled, this instances in this pool will
     * dynamically acquire additional disk space when its Spark workers are
     * running low on disk space. In AWS, this feature requires specific AWS
     * permissions to function correctly - refer to the User Guide for more
     * details.
     */
    enable_elastic_disk?: boolean;
    /**
     * Attributes related to instance pools running on Google Cloud Platform. If
     * not specified at pool creation, a set of default values will be used.
     */
    gcp_attributes?: InstancePoolGcpAttributes;
    /**
     * Automatically terminates the extra instances in the pool cache after they
     * are inactive for this time in minutes if min_idle_instances requirement is
     * already met. If not set, the extra pool instances will be automatically
     * terminated after a default timeout. If specified, the threshold must be
     * between 0 and 10000 minutes. Users can also set this value to 0 to
     * instantly remove idle instances from the cache if min cache size could
     * still hold.
     */
    idle_instance_autotermination_minutes?: number;
    /**
     * The fleet related setting to power the instance pool.
     */
    instance_pool_fleet_attributes?: InstancePoolFleetAttributes;
    /**
     * Canonical unique identifier for the pool.
     */
    instance_pool_id?: string;
    /**
     * Pool name requested by the user. Pool name must be unique. Length must be
     * between 1 and 100 characters.
     */
    instance_pool_name?: string;
    /**
     * Maximum number of outstanding instances to keep in the pool, including
     * both instances used by clusters and idle instances. Clusters that require
     * further instance provisioning will fail during upsize requests.
     */
    max_capacity?: number;
    /**
     * Minimum number of idle instances to keep in the instance pool
     */
    min_idle_instances?: number;
    /**
     * This field encodes, through a single value, the resources available to
     * each of the Spark nodes in this cluster. For example, the Spark nodes can
     * be provisioned and optimized for memory or compute intensive workloads. A
     * list of available node types can be retrieved by using the
     * :method:clusters/listNodeTypes API call.
     */
    node_type_id?: string;
    /**
     * Custom Docker Image BYOC
     */
    preloaded_docker_images?: Array<DockerImage>;
    /**
     * A list of preloaded Spark image versions for the pool. Pool-backed
     * clusters started with the preloaded Spark version will start faster. A
     * list of available Spark versions can be retrieved by using the
     * :method:clusters/sparkVersions API call.
     */
    preloaded_spark_versions?: Array<string>;
    /**
     * Current state of the instance pool.
     */
    state?: InstancePoolState;
    /**
     * Usage statistics about the instance pool.
     */
    stats?: InstancePoolStats;
    /**
     * Status of failed pending instances in the pool.
     */
    status?: InstancePoolStatus;
}

export interface InstancePoolAwsAttributes {
    /**
     * Availability type used for the spot nodes.
     *
     * The default value is defined by
     * InstancePoolConf.instancePoolDefaultAwsAvailability
     */
    availability?: InstancePoolAwsAttributesAvailability;
    /**
     * Calculates the bid price for AWS spot instances, as a percentage of the
     * corresponding instance type's on-demand price. For example, if this field
     * is set to 50, and the cluster needs a new `r3.xlarge` spot instance, then
     * the bid price is half of the price of on-demand `r3.xlarge` instances.
     * Similarly, if this field is set to 200, the bid price is twice the price
     * of on-demand `r3.xlarge` instances. If not specified, the default value is
     * 100. When spot instances are requested for this cluster, only spot
     * instances whose bid price percentage matches this field will be
     * considered. Note that, for safety, we enforce this field to be no more
     * than 10000.
     *
     * The default value and documentation here should be kept consistent with
     * CommonConf.defaultSpotBidPricePercent and
     * CommonConf.maxSpotBidPricePercent.
     */
    spot_bid_price_percent?: number;
    /**
     * Identifier for the availability zone/datacenter in which the cluster
     * resides. This string will be of a form like "us-west-2a". The provided
     * availability zone must be in the same region as the Databricks deployment.
     * For example, "us-west-2a" is not a valid zone id if the Databricks
     * deployment resides in the "us-east-1" region. This is an optional field at
     * cluster creation, and if not specified, a default zone will be used. The
     * list of available zones as well as the default value can be found by using
     * the `List Zones`_ method.
     */
    zone_id?: string;
}

/**
 * Availability type used for the spot nodes.
 *
 * The default value is defined by
 * InstancePoolConf.instancePoolDefaultAwsAvailability
 */
export type InstancePoolAwsAttributesAvailability =
    | "ON_DEMAND"
    | "SPOT"
    | "SPOT_WITH_FALLBACK";

export interface InstancePoolAzureAttributes {
    /**
     * Shows the Availability type used for the spot nodes.
     *
     * The default value is defined by
     * InstancePoolConf.instancePoolDefaultAzureAvailability
     */
    availability?: InstancePoolAzureAttributesAvailability;
    /**
     * The default value and documentation here should be kept consistent with
     * CommonConf.defaultSpotBidMaxPrice.
     */
    spot_bid_max_price?: number;
}

/**
 * Shows the Availability type used for the spot nodes.
 *
 * The default value is defined by
 * InstancePoolConf.instancePoolDefaultAzureAvailability
 */
export type InstancePoolAzureAttributesAvailability =
    | "ON_DEMAND_AZURE"
    | "SPOT_AZURE"
    | "SPOT_WITH_FALLBACK_AZURE";

export interface InstancePoolFleetAttributes {
    fleet_on_demand_option?: FleetOnDemandOption;
    fleet_spot_option?: FleetSpotOption;
    launch_template_overrides?: Array<FleetLaunchTemplateOverride>;
}

export interface InstancePoolGcpAttributes {
    /**
     * This field determines whether the instance pool will contain preemptible
     * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if
     * the former is unavailable.
     */
    gcp_availability?: GcpAvailability;
    /**
     * If provided, each node in the instance pool will have this number of local
     * SSDs attached. Each local SSD is 375GB in size. Refer to [GCP
     * documentation] for the supported number of local SSDs for each instance
     * type.
     *
     * [GCP documentation]: https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds
     */
    local_ssd_count?: number;
}

/**
 * Current state of the instance pool.
 */
export type InstancePoolState = "ACTIVE" | "DELETED" | "STOPPED";

export interface InstancePoolStats {
    /**
     * Number of active instances in the pool that are NOT part of a cluster.
     */
    idle_count?: number;
    /**
     * Number of pending instances in the pool that are NOT part of a cluster.
     */
    pending_idle_count?: number;
    /**
     * Number of pending instances in the pool that are part of a cluster.
     */
    pending_used_count?: number;
    /**
     * Number of active instances in the pool that are part of a cluster.
     */
    used_count?: number;
}

export interface InstancePoolStatus {
    /**
     * List of error messages for the failed pending instances. The
     * pending_instance_errors follows FIFO with maximum length of the min_idle
     * of the pool. The pending_instance_errors is emptied once the number of
     * exiting available instances reaches the min_idle of the pool.
     */
    pending_instance_errors?: Array<PendingInstanceError>;
}

export interface InstanceProfile {
    /**
     * The AWS IAM role ARN of the role associated with the instance profile.
     * This field is required if your role name and instance profile name do not
     * match and you want to use the instance profile with [Databricks SQL
     * Serverless].
     *
     * Otherwise, this field is optional.
     *
     * [Databricks SQL Serverless]: https://docs.databricks.com/sql/admin/serverless.html
     */
    iam_role_arn?: string;
    /**
     * The AWS ARN of the instance profile to register with Databricks. This
     * field is required.
     */
    instance_profile_arn: string;
    /**
     * Boolean flag indicating whether the instance profile should only be used
     * in credential passthrough scenarios. If true, it means the instance
     * profile contains an meta IAM role which could assume a wide range of
     * roles. Therefore it should always be used with authorization. This field
     * is optional, the default value is `false`.
     */
    is_meta_instance_profile?: boolean;
}

export type Language = "python" | "scala" | "sql";

export interface Library {
    /**
     * Specification of a CRAN library to be installed as part of the library
     */
    cran?: RCranLibrary;
    /**
     * URI of the egg to be installed. Currently only DBFS and S3 URIs are
     * supported. For example: `{ "egg": "dbfs:/my/egg" }` or `{ "egg":
     * "s3://my-bucket/egg" }`. If S3 is used, please make sure the cluster has
     * read access on the library. You may need to launch the cluster with an IAM
     * role to access the S3 URI.
     */
    egg?: string;
    /**
     * URI of the jar to be installed. Currently only DBFS and S3 URIs are
     * supported. For example: `{ "jar": "dbfs:/mnt/databricks/library.jar" }` or
     * `{ "jar": "s3://my-bucket/library.jar" }`. If S3 is used, please make sure
     * the cluster has read access on the library. You may need to launch the
     * cluster with an IAM role to access the S3 URI.
     */
    jar?: string;
    /**
     * Specification of a maven library to be installed. For example: `{
     * "coordinates": "org.jsoup:jsoup:1.7.2" }`
     */
    maven?: MavenLibrary;
    /**
     * Specification of a PyPi library to be installed. For example: `{
     * "package": "simplejson" }`
     */
    pypi?: PythonPyPiLibrary;
    /**
     * URI of the wheel to be installed. For example: `{ "whl": "dbfs:/my/whl" }`
     * or `{ "whl": "s3://my-bucket/whl" }`. If S3 is used, please make sure the
     * cluster has read access on the library. You may need to launch the cluster
     * with an IAM role to access the S3 URI.
     */
    whl?: string;
}

export interface LibraryFullStatus {
    /**
     * Whether the library was set to be installed on all clusters via the
     * libraries UI.
     */
    is_library_for_all_clusters?: boolean;
    /**
     * Unique identifier for the library.
     */
    library?: Library;
    /**
     * All the info and warning messages that have occurred so far for this
     * library.
     */
    messages?: Array<string>;
    /**
     * Status of installing the library on the cluster.
     */
    status?: LibraryFullStatusStatus;
}

/**
 * Status of installing the library on the cluster.
 */
export type LibraryFullStatusStatus =
    | "FAILED"
    | "INSTALLED"
    | "INSTALLING"
    | "PENDING"
    | "RESOLVING"
    | "SKIPPED"
    | "UNINSTALL_ON_RESTART";

export interface ListAllClusterLibraryStatusesResponse {
    /**
     * A list of cluster statuses.
     */
    statuses?: Array<ClusterLibraryStatuses>;
}

export interface ListAvailableZonesResponse {
    /**
     * The availability zone if no `zone_id` is provided in the cluster creation
     * request.
     */
    default_zone?: string;
    /**
     * The list of available zones (e.g., ['us-west-2c', 'us-east-2']).
     */
    zones?: Array<string>;
}

/**
 * Get a cluster policy
 */
export interface ListClusterPoliciesRequest {
    /**
     * The cluster policy attribute to sort by. * `POLICY_CREATION_TIME` - Sort
     * result list by policy creation time. * `POLICY_NAME` - Sort result list by
     * policy name.
     */
    sort_column?: ListSortColumn;
    /**
     * The order in which the policies get listed. * `DESC` - Sort result list in
     * descending order. * `ASC` - Sort result list in ascending order.
     */
    sort_order?: ListSortOrder;
}

/**
 * List all clusters
 */
export interface ListClustersRequest {
    /**
     * Filter clusters based on what type of client it can be used for. Could be
     * either NOTEBOOKS or JOBS. No input for this field will get all clusters in
     * the workspace without filtering on its supported client
     */
    can_use_client?: string;
}

export interface ListClustersResponse {
    /**
     * <needs content added>
     */
    clusters?: Array<ClusterDetails>;
}

export interface ListGlobalInitScriptsResponse {
    scripts?: Array<GlobalInitScriptDetails>;
}

export interface ListInstancePools {
    instance_pools?: Array<InstancePoolAndStats>;
}

export interface ListInstanceProfilesResponse {
    /**
     * A list of instance profiles that the user can access.
     */
    instance_profiles?: Array<InstanceProfile>;
}

export interface ListNodeTypesResponse {
    /**
     * The list of available Spark node types.
     */
    node_types?: Array<NodeType>;
}

export interface ListPoliciesResponse {
    /**
     * List of policies.
     */
    policies?: Array<Policy>;
}

/**
 * List policy families
 */
export interface ListPolicyFamiliesRequest {
    /**
     * The max number of policy families to return.
     */
    max_results?: number;
    /**
     * A token that can be used to get the next page of results.
     */
    page_token?: string;
}

export interface ListPolicyFamiliesResponse {
    /**
     * A token that can be used to get the next page of results. If not present,
     * there are no more results to show.
     */
    next_page_token?: string;
    /**
     * List of policy families.
     */
    policy_families: Array<PolicyFamily>;
}

export type ListSortColumn = "POLICY_CREATION_TIME" | "POLICY_NAME";

export type ListSortOrder = "ASC" | "DESC";

export interface LogAnalyticsInfo {
    /**
     * <needs content added>
     */
    log_analytics_primary_key?: string;
    /**
     * <needs content added>
     */
    log_analytics_workspace_id?: string;
}

export interface LogSyncStatus {
    /**
     * The timestamp of last attempt. If the last attempt fails, `last_exception`
     * will contain the exception in the last attempt.
     */
    last_attempted?: number;
    /**
     * The exception thrown in the last attempt, it would be null (omitted in the
     * response) if there is no exception in last attempted.
     */
    last_exception?: string;
}

export interface MavenLibrary {
    /**
     * Gradle-style maven coordinates. For example: "org.jsoup:jsoup:1.7.2".
     */
    coordinates: string;
    /**
     * List of dependences to exclude. For example: `["slf4j:slf4j",
     * "*:hadoop-client"]`.
     *
     * Maven dependency exclusions:
     * https://maven.apache.org/guides/introduction/introduction-to-optional-and-excludes-dependencies.html.
     */
    exclusions?: Array<string>;
    /**
     * Maven repo to install the Maven package from. If omitted, both Maven
     * Central Repository and Spark Packages are searched.
     */
    repo?: string;
}

export interface NodeInstanceType {
    instance_type_id?: string;
    local_disk_size_gb?: number;
    local_disks?: number;
    local_nvme_disk_size_gb?: number;
    local_nvme_disks?: number;
}

export interface NodeType {
    category?: string;
    /**
     * A string description associated with this node type, e.g., "r3.xlarge".
     */
    description: string;
    display_order?: number;
    /**
     * An identifier for the type of hardware that this node runs on, e.g.,
     * "r3.2xlarge" in AWS.
     */
    instance_type_id: string;
    /**
     * Whether the node type is deprecated. Non-deprecated node types offer
     * greater performance.
     */
    is_deprecated?: boolean;
    /**
     * AWS specific, whether this instance supports encryption in transit, used
     * for hipaa and pci workloads.
     */
    is_encrypted_in_transit?: boolean;
    is_graviton?: boolean;
    is_hidden?: boolean;
    is_io_cache_enabled?: boolean;
    /**
     * Memory (in MB) available for this node type.
     */
    memory_mb: number;
    node_info?: CloudProviderNodeInfo;
    node_instance_type?: NodeInstanceType;
    /**
     * Unique identifier for this node type.
     */
    node_type_id: string;
    /**
     * Number of CPU cores available for this node type. Note that this can be
     * fractional, e.g., 2.5 cores, if the the number of cores on a machine
     * instance is not divisible by the number of Spark nodes on that machine.
     */
    num_cores: number;
    num_gpus?: number;
    photon_driver_capable?: boolean;
    photon_worker_capable?: boolean;
    support_cluster_tags?: boolean;
    support_ebs_volumes?: boolean;
    support_port_forwarding?: boolean;
}

export interface PendingInstanceError {
    instance_id?: string;
    message?: string;
}

export interface PermanentDeleteCluster {
    /**
     * The cluster to be deleted.
     */
    cluster_id: string;
}

export interface PinCluster {
    /**
     * <needs content added>
     */
    cluster_id: string;
}

export interface Policy {
    /**
     * Creation time. The timestamp (in millisecond) when this Cluster Policy was
     * created.
     */
    created_at_timestamp?: number;
    /**
     * Creator user name. The field won't be included in the response if the user
     * has already been deleted.
     */
    creator_user_name?: string;
    /**
     * Policy definition document expressed in Databricks Cluster Policy
     * Definition Language.
     */
    definition?: string;
    /**
     * Additional human-readable description of the cluster policy.
     */
    description?: string;
    /**
     * If true, policy is a default policy created and managed by <Databricks>.
     * Default policies cannot be deleted, and their policy families cannot be
     * changed.
     */
    is_default?: boolean;
    /**
     * Max number of clusters per user that can be active using this policy. If
     * not present, there is no max limit.
     */
    max_clusters_per_user?: number;
    /**
     * Cluster Policy name requested by the user. This has to be unique. Length
     * must be between 1 and 100 characters.
     */
    name?: string;
    /**
     * Policy definition JSON document expressed in Databricks Policy Definition
     * Language. The JSON document must be passed as a string and cannot be
     * embedded in the requests.
     *
     * You can use this to customize the policy definition inherited from the
     * policy family. Policy rules specified here are merged into the inherited
     * policy definition.
     */
    policy_family_definition_overrides?: string;
    /**
     * ID of the policy family.
     */
    policy_family_id?: string;
    /**
     * Canonical unique identifier for the Cluster Policy.
     */
    policy_id?: string;
}

export interface PolicyFamily {
    /**
     * Policy definition document expressed in Databricks Cluster Policy
     * Definition Language.
     */
    definition: string;
    /**
     * Human-readable description of the purpose of the policy family.
     */
    description: string;
    /**
     * Name of the policy family.
     */
    name: string;
    /**
     * ID of the policy family.
     */
    policy_family_id: string;
}

/**
 * ID of the policy family.
 */

export interface PythonPyPiLibrary {
    /**
     * The name of the pypi package to install. An optional exact version
     * specification is also supported. Examples: "simplejson" and
     * "simplejson==3.8.0".
     */
    package: string;
    /**
     * The repository where the package can be found. If not specified, the
     * default pip index is used.
     */
    repo?: string;
}

export interface RCranLibrary {
    /**
     * The name of the CRAN package to install.
     */
    package: string;
    /**
     * The repository where the package can be found. If not specified, the
     * default CRAN repo is used.
     */
    repo?: string;
}

export interface RemoveInstanceProfile {
    /**
     * The ARN of the instance profile to remove. This field is required.
     */
    instance_profile_arn: string;
}

export interface ResizeCluster {
    /**
     * Parameters needed in order to automatically scale clusters up and down
     * based on load. Note: autoscaling works best with DB runtime versions 3.0
     * or later.
     */
    autoscale?: AutoScale;
    /**
     * The cluster to be resized.
     */
    cluster_id: string;
    /**
     * Number of worker nodes that this cluster should have. A cluster has one
     * Spark Driver and `num_workers` Executors for a total of `num_workers` + 1
     * Spark nodes.
     *
     * Note: When reading the properties of a cluster, this field reflects the
     * desired number of workers rather than the actual current number of
     * workers. For instance, if a cluster is resized from 5 to 10 workers, this
     * field will immediately be updated to reflect the target size of 10
     * workers, whereas the workers listed in `spark_info` will gradually
     * increase from 5 to 10 as the new nodes are provisioned.
     */
    num_workers?: number;
}

export interface RestartCluster {
    /**
     * The cluster to be started.
     */
    cluster_id: string;
    /**
     * <needs content added>
     */
    restart_user?: string;
}

export type ResultType = "error" | "image" | "images" | "table" | "text";

export interface Results {
    /**
     * The cause of the error
     */
    cause?: string;
    data?: any /* MISSING TYPE */;
    /**
     * The image filename
     */
    fileName?: string;
    fileNames?: Array<string>;
    /**
     * true if a JSON schema is returned instead of a string representation of
     * the Hive type.
     */
    isJsonSchema?: boolean;
    /**
     * internal field used by SDK
     */
    pos?: number;
    resultType?: ResultType;
    /**
     * The table schema
     */
    schema?: Array<Record<string, any /* MISSING TYPE */>>;
    /**
     * The summary of the error
     */
    summary?: string;
    /**
     * true if partial results are returned.
     */
    truncated?: boolean;
}

/**
 * Decides which runtime engine to be use, e.g. Standard vs. Photon. If
 * unspecified, the runtime engine is inferred from spark_version.
 */
export type RuntimeEngine = "NULL" | "PHOTON" | "STANDARD";

export interface S3StorageInfo {
    /**
     * (Optional) Set canned access control list for the logs, e.g.
     * `bucket-owner-full-control`. If `canned_cal` is set, please make sure the
     * cluster iam role has `s3:PutObjectAcl` permission on the destination
     * bucket and prefix. The full list of possible canned acl can be found at
     * http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl.
     * Please also note that by default only the object owner gets full controls.
     * If you are using cross account role for writing data, you may want to set
     * `bucket-owner-full-control` to make bucket owner able to read the logs.
     */
    canned_acl?: string;
    /**
     * S3 destination, e.g. `s3://my-bucket/some-prefix` Note that logs will be
     * delivered using cluster iam role, please make sure you set cluster iam
     * role and the role has write access to the destination. Please also note
     * that you cannot use AWS keys to deliver logs.
     */
    destination?: string;
    /**
     * (Optional) Flag to enable server side encryption, `false` by default.
     */
    enable_encryption?: boolean;
    /**
     * (Optional) The encryption type, it could be `sse-s3` or `sse-kms`. It will
     * be used only when encryption is enabled and the default type is `sse-s3`.
     */
    encryption_type?: string;
    /**
     * S3 endpoint, e.g. `https://s3-us-west-2.amazonaws.com`. Either region or
     * endpoint needs to be set. If both are set, endpoint will be used.
     */
    endpoint?: string;
    /**
     * (Optional) Kms key which will be used if encryption is enabled and
     * encryption type is set to `sse-kms`.
     */
    kms_key?: string;
    /**
     * S3 region, e.g. `us-west-2`. Either region or endpoint needs to be set. If
     * both are set, endpoint will be used.
     */
    region?: string;
}

export interface SparkNode {
    /**
     * The private IP address of the host instance.
     */
    host_private_ip?: string;
    /**
     * Globally unique identifier for the host instance from the cloud provider.
     */
    instance_id?: string;
    /**
     * Attributes specific to AWS for a Spark node.
     */
    node_aws_attributes?: SparkNodeAwsAttributes;
    /**
     * Globally unique identifier for this node.
     */
    node_id?: string;
    /**
     * Private IP address (typically a 10.x.x.x address) of the Spark node. Note
     * that this is different from the private IP address of the host instance.
     */
    private_ip?: string;
    /**
     * Public DNS address of this node. This address can be used to access the
     * Spark JDBC server on the driver node. To communicate with the JDBC server,
     * traffic must be manually authorized by adding security group rules to the
     * "worker-unmanaged" security group via the AWS console.
     *
     * Actually it's the public DNS address of the host instance.
     */
    public_dns?: string;
    /**
     * The timestamp (in millisecond) when the Spark node is launched.
     *
     * The start_timestamp is set right before the container is being launched.
     * The timestamp when the container is placed on the ResourceManager, before
     * its launch and setup by the NodeDaemon. This timestamp is the same as the
     * creation timestamp in the database.
     */
    start_timestamp?: number;
}

export interface SparkNodeAwsAttributes {
    /**
     * Whether this node is on an Amazon spot instance.
     */
    is_spot?: boolean;
}

export interface SparkVersion {
    /**
     * Spark version key, for example "2.1.x-scala2.11". This is the value which
     * should be provided as the "spark_version" when creating a new cluster.
     * Note that the exact Spark version may change over time for a "wildcard"
     * version (i.e., "2.1.x-scala2.11" is a "wildcard" version) with minor bug
     * fixes.
     */
    key?: string;
    /**
     * A descriptive name for this Spark version, for example "Spark 2.1".
     */
    name?: string;
}

export interface StartCluster {
    /**
     * The cluster to be started.
     */
    cluster_id: string;
}

/**
 * Current state of the cluster.
 */
export type State =
    | "ERROR"
    | "PENDING"
    | "RESIZING"
    | "RESTARTING"
    | "RUNNING"
    | "TERMINATED"
    | "TERMINATING"
    | "UNKNOWN";

export interface TerminationReason {
    /**
     * status code indicating why the cluster was terminated
     */
    code?: TerminationReasonCode;
    /**
     * list of parameters that provide additional information about why the
     * cluster was terminated
     */
    parameters?: Record<string, string>;
    /**
     * type of the termination
     */
    type?: TerminationReasonType;
}

/**
 * status code indicating why the cluster was terminated
 */
export type TerminationReasonCode =
    | "ABUSE_DETECTED"
    | "ATTACH_PROJECT_FAILURE"
    | "AWS_AUTHORIZATION_FAILURE"
    | "AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE"
    | "AWS_INSUFFICIENT_INSTANCE_CAPACITY_FAILURE"
    | "AWS_MAX_SPOT_INSTANCE_COUNT_EXCEEDED_FAILURE"
    | "AWS_REQUEST_LIMIT_EXCEEDED"
    | "AWS_UNSUPPORTED_FAILURE"
    | "AZURE_BYOK_KEY_PERMISSION_FAILURE"
    | "AZURE_EPHEMERAL_DISK_FAILURE"
    | "AZURE_INVALID_DEPLOYMENT_TEMPLATE"
    | "AZURE_OPERATION_NOT_ALLOWED_EXCEPTION"
    | "AZURE_QUOTA_EXCEEDED_EXCEPTION"
    | "AZURE_RESOURCE_MANAGER_THROTTLING"
    | "AZURE_RESOURCE_PROVIDER_THROTTLING"
    | "AZURE_UNEXPECTED_DEPLOYMENT_TEMPLATE_FAILURE"
    | "AZURE_VM_EXTENSION_FAILURE"
    | "AZURE_VNET_CONFIGURATION_FAILURE"
    | "BOOTSTRAP_TIMEOUT"
    | "BOOTSTRAP_TIMEOUT_CLOUD_PROVIDER_EXCEPTION"
    | "CLOUD_PROVIDER_DISK_SETUP_FAILURE"
    | "CLOUD_PROVIDER_LAUNCH_FAILURE"
    | "CLOUD_PROVIDER_RESOURCE_STOCKOUT"
    | "CLOUD_PROVIDER_SHUTDOWN"
    | "COMMUNICATION_LOST"
    | "CONTAINER_LAUNCH_FAILURE"
    | "CONTROL_PLANE_REQUEST_FAILURE"
    | "DATABASE_CONNECTION_FAILURE"
    | "DBFS_COMPONENT_UNHEALTHY"
    | "DOCKER_IMAGE_PULL_FAILURE"
    | "DRIVER_UNREACHABLE"
    | "DRIVER_UNRESPONSIVE"
    | "EXECUTION_COMPONENT_UNHEALTHY"
    | "GCP_QUOTA_EXCEEDED"
    | "GCP_SERVICE_ACCOUNT_DELETED"
    | "GLOBAL_INIT_SCRIPT_FAILURE"
    | "HIVE_METASTORE_PROVISIONING_FAILURE"
    | "IMAGE_PULL_PERMISSION_DENIED"
    | "INACTIVITY"
    | "INIT_SCRIPT_FAILURE"
    | "INSTANCE_POOL_CLUSTER_FAILURE"
    | "INSTANCE_UNREACHABLE"
    | "INTERNAL_ERROR"
    | "INVALID_ARGUMENT"
    | "INVALID_SPARK_IMAGE"
    | "IP_EXHAUSTION_FAILURE"
    | "JOB_FINISHED"
    | "K8S_AUTOSCALING_FAILURE"
    | "K8S_DBR_CLUSTER_LAUNCH_TIMEOUT"
    | "METASTORE_COMPONENT_UNHEALTHY"
    | "NEPHOS_RESOURCE_MANAGEMENT"
    | "NETWORK_CONFIGURATION_FAILURE"
    | "NFS_MOUNT_FAILURE"
    | "NPIP_TUNNEL_SETUP_FAILURE"
    | "NPIP_TUNNEL_TOKEN_FAILURE"
    | "REQUEST_REJECTED"
    | "REQUEST_THROTTLED"
    | "SECRET_RESOLUTION_ERROR"
    | "SECURITY_DAEMON_REGISTRATION_EXCEPTION"
    | "SELF_BOOTSTRAP_FAILURE"
    | "SKIPPED_SLOW_NODES"
    | "SLOW_IMAGE_DOWNLOAD"
    | "SPARK_ERROR"
    | "SPARK_IMAGE_DOWNLOAD_FAILURE"
    | "SPARK_STARTUP_FAILURE"
    | "SPOT_INSTANCE_TERMINATION"
    | "STORAGE_DOWNLOAD_FAILURE"
    | "STS_CLIENT_SETUP_FAILURE"
    | "SUBNET_EXHAUSTED_FAILURE"
    | "TEMPORARILY_UNAVAILABLE"
    | "TRIAL_EXPIRED"
    | "UNEXPECTED_LAUNCH_FAILURE"
    | "UNKNOWN"
    | "UNSUPPORTED_INSTANCE_TYPE"
    | "UPDATE_INSTANCE_PROFILE_FAILURE"
    | "USER_REQUEST"
    | "WORKER_SETUP_FAILURE"
    | "WORKSPACE_CANCELLED_ERROR"
    | "WORKSPACE_CONFIGURATION_ERROR";

/**
 * type of the termination
 */
export type TerminationReasonType =
    | "CLIENT_ERROR"
    | "CLOUD_FAILURE"
    | "SERVICE_FAULT"
    | "SUCCESS";

export interface UninstallLibraries {
    /**
     * Unique identifier for the cluster on which to uninstall these libraries.
     */
    cluster_id: string;
    /**
     * The libraries to uninstall.
     */
    libraries: Array<Library>;
}

export interface UnpinCluster {
    /**
     * <needs content added>
     */
    cluster_id: string;
}

export interface WorkloadType {
    /**
     * defined what type of clients can use the cluster. E.g. Notebooks, Jobs
     */
    clients?: ClientsTypes;
}

export interface WorkspaceStorageInfo {
    /**
     * workspace files destination, e.g. `/Users/user1@databricks.com/my-init.sh`
     */
    destination?: string;
}
