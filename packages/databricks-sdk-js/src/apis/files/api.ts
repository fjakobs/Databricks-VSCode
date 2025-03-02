/* eslint-disable @typescript-eslint/naming-convention */
// Code generated from OpenAPI specs by Databricks SDK Generator. DO NOT EDIT.

/**
 * DBFS API makes it simple to interact with various data sources without having to include a users credentials every time to read a file.
 */

import {ApiClient} from "../../api-client";
import * as files from "./model";
import {EmptyResponse} from "../../types";
import Time from "../../retries/Time";
import retry from "../../retries/retries";
import {CancellationToken} from "../../types";
import {ApiError, ApiRetriableError} from "../apiError";
import {context, Context} from "../../context";
import {ExposedLoggers, withLogContext} from "../../logging";
import {Waiter, asWaiter} from "../../wait";

export class DbfsRetriableError extends ApiRetriableError {
    constructor(method: string, message?: string) {
        super("Dbfs", method, message);
    }
}
export class DbfsError extends ApiError {
    constructor(method: string, message?: string) {
        super("Dbfs", method, message);
    }
}

/**
 * DBFS API makes it simple to interact with various data sources without having
 * to include a users credentials every time to read a file.
 */
export class DbfsService {
    constructor(readonly client: ApiClient) {}

    @withLogContext(ExposedLoggers.SDK)
    private async _addBlock(
        request: files.AddBlock,
        @context context?: Context
    ): Promise<EmptyResponse> {
        const path = "/api/2.0/dbfs/add-block";
        return (await this.client.request(
            path,
            "POST",
            request,
            context
        )) as EmptyResponse;
    }

    /**
     * Append data block.
     *
     * Appends a block of data to the stream specified by the input handle. If
     * the handle does not exist, this call will throw an exception with
     * `RESOURCE_DOES_NOT_EXIST`.
     *
     * If the block of data exceeds 1 MB, this call will throw an exception with
     * `MAX_BLOCK_SIZE_EXCEEDED`.
     */
    @withLogContext(ExposedLoggers.SDK)
    async addBlock(
        request: files.AddBlock,
        @context context?: Context
    ): Promise<EmptyResponse> {
        return await this._addBlock(request, context);
    }

    @withLogContext(ExposedLoggers.SDK)
    private async _close(
        request: files.Close,
        @context context?: Context
    ): Promise<EmptyResponse> {
        const path = "/api/2.0/dbfs/close";
        return (await this.client.request(
            path,
            "POST",
            request,
            context
        )) as EmptyResponse;
    }

    /**
     * Close the stream.
     *
     * Closes the stream specified by the input handle. If the handle does not
     * exist, this call throws an exception with `RESOURCE_DOES_NOT_EXIST`.
     */
    @withLogContext(ExposedLoggers.SDK)
    async close(
        request: files.Close,
        @context context?: Context
    ): Promise<EmptyResponse> {
        return await this._close(request, context);
    }

    @withLogContext(ExposedLoggers.SDK)
    private async _create(
        request: files.Create,
        @context context?: Context
    ): Promise<files.CreateResponse> {
        const path = "/api/2.0/dbfs/create";
        return (await this.client.request(
            path,
            "POST",
            request,
            context
        )) as files.CreateResponse;
    }

    /**
     * Open a stream.
     *
     * Opens a stream to write to a file and returns a handle to this stream.
     * There is a 10 minute idle timeout on this handle. If a file or directory
     * already exists on the given path and __overwrite__ is set to `false`, this
     * call throws an exception with `RESOURCE_ALREADY_EXISTS`.
     *
     * A typical workflow for file upload would be:
     *
     * 1. Issue a `create` call and get a handle. 2. Issue one or more
     * `add-block` calls with the handle you have. 3. Issue a `close` call with
     * the handle you have.
     */
    @withLogContext(ExposedLoggers.SDK)
    async create(
        request: files.Create,
        @context context?: Context
    ): Promise<files.CreateResponse> {
        return await this._create(request, context);
    }

    @withLogContext(ExposedLoggers.SDK)
    private async _delete(
        request: files.Delete,
        @context context?: Context
    ): Promise<EmptyResponse> {
        const path = "/api/2.0/dbfs/delete";
        return (await this.client.request(
            path,
            "POST",
            request,
            context
        )) as EmptyResponse;
    }

    /**
     * Delete a file/directory.
     *
     * Delete the file or directory (optionally recursively delete all files in
     * the directory). This call throws an exception with `IO_ERROR` if the path
     * is a non-empty directory and `recursive` is set to `false` or on other
     * similar errors.
     *
     * When you delete a large number of files, the delete operation is done in
     * increments. The call returns a response after approximately 45 seconds
     * with an error message (503 Service Unavailable) asking you to re-invoke
     * the delete operation until the directory structure is fully deleted.
     *
     * For operations that delete more than 10K files, we discourage using the
     * DBFS REST API, but advise you to perform such operations in the context of
     * a cluster, using the [File system utility
     * (dbutils.fs)](/dev-tools/databricks-utils.html#dbutils-fs). `dbutils.fs`
     * covers the functional scope of the DBFS REST API, but from notebooks.
     * Running such operations using notebooks provides better control and
     * manageability, such as selective deletes, and the possibility to automate
     * periodic delete jobs.
     */
    @withLogContext(ExposedLoggers.SDK)
    async delete(
        request: files.Delete,
        @context context?: Context
    ): Promise<EmptyResponse> {
        return await this._delete(request, context);
    }

    @withLogContext(ExposedLoggers.SDK)
    private async _getStatus(
        request: files.GetStatusRequest,
        @context context?: Context
    ): Promise<files.FileInfo> {
        const path = "/api/2.0/dbfs/get-status";
        return (await this.client.request(
            path,
            "GET",
            request,
            context
        )) as files.FileInfo;
    }

    /**
     * Get the information of a file or directory.
     *
     * Gets the file information for a file or directory. If the file or
     * directory does not exist, this call throws an exception with
     * `RESOURCE_DOES_NOT_EXIST`.
     */
    @withLogContext(ExposedLoggers.SDK)
    async getStatus(
        request: files.GetStatusRequest,
        @context context?: Context
    ): Promise<files.FileInfo> {
        return await this._getStatus(request, context);
    }

    @withLogContext(ExposedLoggers.SDK)
    private async _list(
        request: files.ListDbfsRequest,
        @context context?: Context
    ): Promise<files.ListStatusResponse> {
        const path = "/api/2.0/dbfs/list";
        return (await this.client.request(
            path,
            "GET",
            request,
            context
        )) as files.ListStatusResponse;
    }

    /**
     * List directory contents or file details.
     *
     * List the contents of a directory, or details of the file. If the file or
     * directory does not exist, this call throws an exception with
     * `RESOURCE_DOES_NOT_EXIST`.
     *
     * When calling list on a large directory, the list operation will time out
     * after approximately 60 seconds. We strongly recommend using list only on
     * directories containing less than 10K files and discourage using the DBFS
     * REST API for operations that list more than 10K files. Instead, we
     * recommend that you perform such operations in the context of a cluster,
     * using the [File system utility
     * (dbutils.fs)](/dev-tools/databricks-utils.html#dbutils-fs), which provides
     * the same functionality without timing out.
     */
    @withLogContext(ExposedLoggers.SDK)
    async *list(
        request: files.ListDbfsRequest,
        @context context?: Context
    ): AsyncIterable<files.FileInfo> {
        const response = (await this._list(request, context)).files;
        for (const v of response || []) {
            yield v;
        }
    }

    @withLogContext(ExposedLoggers.SDK)
    private async _mkdirs(
        request: files.MkDirs,
        @context context?: Context
    ): Promise<EmptyResponse> {
        const path = "/api/2.0/dbfs/mkdirs";
        return (await this.client.request(
            path,
            "POST",
            request,
            context
        )) as EmptyResponse;
    }

    /**
     * Create a directory.
     *
     * Creates the given directory and necessary parent directories if they do
     * not exist. If a file (not a directory) exists at any prefix of the input
     * path, this call throws an exception with `RESOURCE_ALREADY_EXISTS`.
     * **Note**: If this operation fails, it might have succeeded in creating
     * some of the necessary parent directories.
     */
    @withLogContext(ExposedLoggers.SDK)
    async mkdirs(
        request: files.MkDirs,
        @context context?: Context
    ): Promise<EmptyResponse> {
        return await this._mkdirs(request, context);
    }

    @withLogContext(ExposedLoggers.SDK)
    private async _move(
        request: files.Move,
        @context context?: Context
    ): Promise<EmptyResponse> {
        const path = "/api/2.0/dbfs/move";
        return (await this.client.request(
            path,
            "POST",
            request,
            context
        )) as EmptyResponse;
    }

    /**
     * Move a file.
     *
     * Moves a file from one location to another location within DBFS. If the
     * source file does not exist, this call throws an exception with
     * `RESOURCE_DOES_NOT_EXIST`. If a file already exists in the destination
     * path, this call throws an exception with `RESOURCE_ALREADY_EXISTS`. If the
     * given source path is a directory, this call always recursively moves all
     * files.",
     */
    @withLogContext(ExposedLoggers.SDK)
    async move(
        request: files.Move,
        @context context?: Context
    ): Promise<EmptyResponse> {
        return await this._move(request, context);
    }

    @withLogContext(ExposedLoggers.SDK)
    private async _put(
        request: files.Put,
        @context context?: Context
    ): Promise<EmptyResponse> {
        const path = "/api/2.0/dbfs/put";
        return (await this.client.request(
            path,
            "POST",
            request,
            context
        )) as EmptyResponse;
    }

    /**
     * Upload a file.
     *
     * Uploads a file through the use of multipart form post. It is mainly used
     * for streaming uploads, but can also be used as a convenient single call
     * for data upload.
     *
     * Alternatively you can pass contents as base64 string.
     *
     * The amount of data that can be passed (when not streaming) using the
     * __contents__ parameter is limited to 1 MB. `MAX_BLOCK_SIZE_EXCEEDED` will
     * be thrown if this limit is exceeded.
     *
     * If you want to upload large files, use the streaming upload. For details,
     * see :method:dbfs/create, :method:dbfs/addBlock, :method:dbfs/close.
     */
    @withLogContext(ExposedLoggers.SDK)
    async put(
        request: files.Put,
        @context context?: Context
    ): Promise<EmptyResponse> {
        return await this._put(request, context);
    }

    @withLogContext(ExposedLoggers.SDK)
    private async _read(
        request: files.ReadDbfsRequest,
        @context context?: Context
    ): Promise<files.ReadResponse> {
        const path = "/api/2.0/dbfs/read";
        return (await this.client.request(
            path,
            "GET",
            request,
            context
        )) as files.ReadResponse;
    }

    /**
     * Get the contents of a file.
     *
     * Returns the contents of a file. If the file does not exist, this call
     * throws an exception with `RESOURCE_DOES_NOT_EXIST`. If the path is a
     * directory, the read length is negative, or if the offset is negative, this
     * call throws an exception with `INVALID_PARAMETER_VALUE`. If the read
     * length exceeds 1 MB, this call throws an exception with
     * `MAX_READ_SIZE_EXCEEDED`.
     *
     * If `offset + length` exceeds the number of bytes in a file, it reads the
     * contents until the end of file.",
     */
    @withLogContext(ExposedLoggers.SDK)
    async read(
        request: files.ReadDbfsRequest,
        @context context?: Context
    ): Promise<files.ReadResponse> {
        return await this._read(request, context);
    }
}
